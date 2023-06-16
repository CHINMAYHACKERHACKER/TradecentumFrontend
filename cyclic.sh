#!/bin/bash

# Forcefully install dependencies, including legacy peer dependencies
npm install --force --legacy-peer-deps

# Run the build command
npm run build
