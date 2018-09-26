const fs = require("fs-extra")
const path = require("path")
const solc = require("solc")

//cleanup
const compiledDir = path.resolve(__dirname,'../compiled')

//compile
const contractPath = path.resolve(__dirname,"../contracts","Car.sol")
const contractSource = fs.readFileSync(contractPath,"UTF8")

const result = solc.compile(contractSource,1)
console.log(result)

//save to disk 
Object.keys(result.contracts).forEach(name =>{
    const contractName = name.replace(/^:/,'')
  //  const filePath = path.resolve(__dirname,'../complied',`${contractName}.json`)
    const filePath = path.resolve(compiledDir,`${contractName}.json`)
    fs.outputJsonSync(filePath,result.contracts[name])
    console.log(`save compiled contract ${contractName} to ${filePath}`)
})
