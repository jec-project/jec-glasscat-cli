//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2017 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { GlassCatCliError } from "../../../../../../src/com/onsoft/glasscat/cli/exceptions/GlassCatCliError";

@TestSuite({
  description: "Test the GlassCatCliError class methods."
})
export class GlassCatCliErrorTest {

  @Test({
    description: "should extend the Error class"
  })
  public typeOfErrorTest():void {
    let error:GlassCatCliError = new GlassCatCliError(null, null);
    expect(error).to.be.an.instanceOf(Error);
  }
  
  @Test({
    description: "should return the same message as passed to the constructor function"
  })
  public messageTest():void {
    let msg:string = "Error message!";
    let error:GlassCatCliError = new GlassCatCliError(msg, null);
    expect(error.message).to.equal(msg);
  }
  
  @Test({
    description: "should return the same error stack as passed to the constructor function"
  })
  public getStackTest():void {
    let stack:string = "Error stack message";
    let error:GlassCatCliError = new GlassCatCliError(null, stack);
    expect(error.getStack()).to.equal(stack);
  }
}