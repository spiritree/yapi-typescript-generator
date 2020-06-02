import { Spec } from "swagger-schema-official";
import { getAllPaths, generateKeyApiInfo } from './utils/data-struct'
let swaggerSpec: Spec = require("./swagger-api.json");

const allPaths = getAllPaths(swaggerSpec)


const keyApiInfo = generateKeyApiInfo({
  spec: swaggerSpec,
  paths: allPaths
})
