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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { CommandHelpFormatter } from "../../../../../../src/com/onsoft/glasscat/cli/utils/CommandHelpFormatter";
import { CommandDescriptorBuilder } from "../../../../../../src/com/onsoft/glasscat/cli/utils/CommandDescriptorBuilder"
import { CommandDescriptor } from "../../../../../../src/com/onsoft/glasscat/cli/core/CommandDescriptor";
import { ParameterDescriptorBuilder } from "../../../../../../src/com/onsoft/glasscat/cli/utils/ParameterDescriptorBuilder"
import { ParameterDescriptor } from "../../../../../../src/com/onsoft/glasscat/cli/core/ParameterDescriptor";

@TestSuite({
  description: "Test the CommandHelpFormatter class methods."
})
export class CommandHelpFormatterTest {

  private formatter:CommandHelpFormatter = null;
  private commandBuilder:CommandDescriptorBuilder = null;
  private paramBuilder:ParameterDescriptorBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.formatter =  new CommandHelpFormatter();
    this.commandBuilder = new CommandDescriptorBuilder();
    this.paramBuilder = new ParameterDescriptorBuilder();
  }
  
  @Test({
    description: "should return a string that contains 'command:'"
  })
  public commandTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description
    );
    expect(this.formatter.format(descriptor)).to.include("command:");
  }

  @Test({
    description: "should return a string that contains the specified name"
  })
  public nameTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description
    );
    expect(this.formatter.format(descriptor)).to.include(name);
  }

  @Test({
    description: "should return a string that contains the specified description"
  })
  public descriptionTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description
    );
    expect(this.formatter.format(descriptor)).to.include(description);
  }
  
  @Test({
    description: "should return a string that contains the specified parameter name"
  })
  public paramNameTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let paramName:string = "fooName";
    let paramDescription:string = "barName";
    let type:string = "object";
    let paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type
    );
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include(paramName);
  }
  
  @Test({
    description: "should return a string that contains the specified parameter description"
  })
  public paramDescriptionTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let paramName:string = "fooName";
    let paramDescription:string = "barName";
    let type:string = "object";
    let paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type
    );
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include(paramDescription);
  }
  
  @Test({
    description: "should return a string that contains the specified parameter type"
  })
  public paramTypeTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let paramName:string = "fooName";
    let paramDescription:string = "barName";
    let type:string = "object";
    let paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type
    );
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include(type);
  }
  
  @Test({
    description: "should return a string that not contains 'required'"
  })
  public paramRequiredFalseTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let paramName:string = "fooName";
    let paramDescription:string = "barName";
    let type:string = "object";
    let paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type, false
    );
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.not.include("required");
  }

  @Test({
    description: "should return a string that contains 'required'"
  })
  public paramRequiredTrueTest():void {
    let name:string = "foo";
    let description:string = "bar";
    let paramName:string = "fooName";
    let paramDescription:string = "barName";
    let type:string = "object";
    let paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type, true
    );
    let descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include("required");
  }
}