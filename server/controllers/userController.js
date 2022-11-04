const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const e = require('cors')
const solc = require('solc');
const path = require("path");
const fs = require("fs-extra");
const { response } = require('express')
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require("got")

let counter = 0

const registerUser = asyncHandler ( async (req, res) => {

    const {email_address, password} = req.body
    // Check if user already exists
    const userExists = await User.findOne({email_address})

    if (userExists) {
        res.status(400).json({ message: 'User Exists' })
    } else {

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email_address: req.body.email_address,
            public_key: req.body.public_key,
            private_key: req.body.private_key,
            wallet_chains: req.body.wallet_chains
          })
          try {
            const newUser = await user.save()
            res.status(201).json({
                __id: user.id, 
                name: user.username,
                email: user.email_address,
                token: generateToken(user._id)
            })
          } catch (err) {
            res.status(400).json({ message: err.message })
          }
    }
  })

const loginUser = asyncHandler( async (req, res) => {
    const {username, password} = req.body

    // Locate user
    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
        message: 'User Successfully Logged In',
        token: generateToken(user._id),
        id: user._id,
        username: user.username
        })
    } else {
        res.status(400)
        throw new Error('Password Incorect')
    }
})

const getKeys = asyncHandler( async (req, res) => {
  const {username, password} = req.body
    // Locate user
    const user = await User.findOne({username})

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
    message: 'User Successfully Logged In',
    private_key: user.private_key,
    public_key: user.public_key
    })
} else {
    res.status(400)
    throw new Error('Password Incorect')
}

})

const getImageURL = asyncHandler( async (req, res) => {
  const {username} = req.body
  // Locate user
  const user = await User.findOne({username})

  res.json({
    message: "URL Found",
    imageURL: user.collection_assets[(collection_assets.length -1)][1]
  })
})

const getUser = asyncHandler(async (req, res, next) => {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find user' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  })

// Create Metadata Directory and Pin Folder to Pinata
const createAndPinDirectory = asyncHandler(async (req,res) => {
  
  const {metadata} = req.body // Recieve an array of JSON metadata

    if (fs.exists(`./temp-metadata/new-nft-collection-${counter}`)) {
      counter = counter + 1
    }
    fs.mkdirSync(`./temp-metadata/new-nft-collection-${counter}`); // Create dir for metada

    // Foreach element inside array, create a new JSON file in directory
    for (let i = 1; i < metadata.length; i++) {
      fs.writeFile(`./temp-metadata/new-nft-collection-${counter}/${i}.json`, `${metadata[i]}`, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      });
    }

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = `./temp-metadata/new-nft-collection-${counter}`;
    const { dirs, files } = await rfs.read(src);
    console.log('files exist here -->', files)
    console.log('src is -->', src)
    let data = new FormData();

    if (files.length > 1) {
      try {  

        for (const file of files) {
          data.append(`file`, fs.createReadStream(file), {
            filepath: basePathConverter(src, file),
          });
          console.log('appended')
        }  
        console.log('The data is here -->', data)
  
        const response = await got(url, {
          method: 'POST',
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': `${process.env.PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.PINATA_API_SECRET}`
          },
          body: data
         })		
        .on('uploadProgress', progress => {
          console.log(progress);
        });
    
        counter = counter + 1
  
        res.json({
          message: 'Success!',
          response: `${response.body}`,
          hash: `${response.IpfsHash}`
        })
      } catch (error) {
        res.json({
          message: 'Error!',
          error: `${error}`
        })
      }
    } else {
      const { dirs, files } = await rfs.read(src);
      let data = new FormData();

      try {  

        for (const file of files) {
          data.append(`file`, fs.createReadStream(file), {
            filepath: basePathConverter(src, file),
          });
          console.log('appended')
        }  
        console.log('The data is here -->', data)
  
        const response = await got(url, {
          method: 'POST',
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': `${process.env.PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.PINATA_API_SECRET}`
          },
          body: data
         })		
        .on('uploadProgress', progress => {
          console.log(progress);
        });
    
        counter = counter + 1
  
        res.json({
          message: 'Success!',
          response: `${response.body}`,
          hash: `${response.IpfsHash}`
        })
      } catch (error) {
        res.json({
          message: 'Error!',
          error: `${error}`
        })
      }
    }
  
})

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

// Compile smart contract
const compileContract = asyncHandler(async (req, res) => {

const {smartContract} = req.body
console.log('The client contract is -->', smartContract)

// ERC
const contractPath = path.resolve("smartContracts", "ERC721.sol");
const ERC165Path = path.resolve("smartContracts", "ERC165.sol");
const ERC721URIStoragePath = path.resolve("smartContracts", "ERC721URIStorage.sol");

// IERC
const contractPathThree = path.resolve("smartContracts", "IERC165.sol");
const contractPathTwo = path.resolve("smartContracts", "IERC721.sol");
const IERC721ReceiverPath = path.resolve("smartContracts", "IERC721Receiver.sol");
const IERC721MetadataPath = path.resolve("smartContracts", "IERC721Metadata.sol");

// ELEMENTS
const AddressPath = path.resolve("smartContracts", "Address.sol");
const ContextPath = path.resolve("smartContracts", "Context.sol");
const StringsPath = path.resolve("smartContracts", "Strings.sol");
const CountersPath = path.resolve("smartContracts", "Counters.sol");


var input = {
  language: 'Solidity',
  sources: {
    'ERC721.sol': {
      content: fs.readFileSync(contractPath, 'utf8')
    },
    'ERC721URIStorage.sol': {
      content: fs.readFileSync(ERC721URIStoragePath, 'utf8')
    },
    'IERC721.sol': {
      content: fs.readFileSync(contractPathTwo, 'utf8')
    },
    'IERC721Receiver.sol': {
      content: fs.readFileSync(IERC721ReceiverPath, 'utf8')
    },
    'IERC721Metadata.sol': {
      content: fs.readFileSync(IERC721MetadataPath, 'utf8')
    },
    'IERC165.sol': {
      content: fs.readFileSync(contractPathThree, 'utf8')
    },
    'Address.sol': {
      content: fs.readFileSync(AddressPath, 'utf8')
    },
    'Strings.sol': {
      content: fs.readFileSync(StringsPath, 'utf8')
    },
    'Context.sol': {
      content: fs.readFileSync(ContextPath, 'utf8')
    },
    'ERC165.sol': {
      content: fs.readFileSync(ERC165Path, 'utf8')
    },
    'Counters.sol': {
      content: fs.readFileSync(CountersPath, 'utf8')
    } ,
    'HelloWorld.sol': {
      content: `${smartContract.toString()}`
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  console.log(JSON.stringify(output.contracts['HelloWorld.sol'].HelloWorld.abi))
  console.log(JSON.stringify(output.contracts['HelloWorld.sol'].HelloWorld.evm.bytecode.object))

  return res.status(200).json({ 
    abi: `${JSON.stringify(output.contracts['HelloWorld.sol'].HelloWorld.abi)}`,
    bytecode:  JSON.stringify(output.contracts['HelloWorld.sol'].HelloWorld.evm.bytecode.object)
  })
})


module.exports = {
    registerUser,
    loginUser,
    getUser,
    compileContract,
    createAndPinDirectory,
    getKeys,
    getImageURL
}