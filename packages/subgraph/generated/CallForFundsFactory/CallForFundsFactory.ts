// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CallForFundsCreated extends ethereum.Event {
  get params(): CallForFundsCreated__Params {
    return new CallForFundsCreated__Params(this);
  }
}

export class CallForFundsCreated__Params {
  _event: CallForFundsCreated;

  constructor(event: CallForFundsCreated) {
    this._event = event;
  }

  get CallForFunds(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get description(): string {
    return this._event.parameters[3].value.toString();
  }

  get image(): string {
    return this._event.parameters[4].value.toString();
  }

  get category(): string {
    return this._event.parameters[5].value.toString();
  }

  get genre(): string {
    return this._event.parameters[6].value.toString();
  }

  get subgenre(): string {
    return this._event.parameters[7].value.toString();
  }

  get timelineInDays(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }

  get minFundingAmount(): BigInt {
    return this._event.parameters[9].value.toBigInt();
  }

  get deliverableMedium(): string {
    return this._event.parameters[10].value.toString();
  }

  get videoUri(): string {
    return this._event.parameters[11].value.toString();
  }
}

export class CallForFundsFactory extends ethereum.SmartContract {
  static bind(address: Address): CallForFundsFactory {
    return new CallForFundsFactory("CallForFundsFactory", address);
  }

  createCallForFunds(
    title_: string,
    description_: string,
    image_: string,
    category_: string,
    genre_: string,
    subgenre_: string,
    timelineInDays_: BigInt,
    minFundingAmount_: BigInt,
    deliverableMedium_: string,
    videoUri_: string
  ): Address {
    let result = super.call(
      "createCallForFunds",
      "createCallForFunds(string,string,string,string,string,string,uint96,uint256,string,string):(address)",
      [
        ethereum.Value.fromString(title_),
        ethereum.Value.fromString(description_),
        ethereum.Value.fromString(image_),
        ethereum.Value.fromString(category_),
        ethereum.Value.fromString(genre_),
        ethereum.Value.fromString(subgenre_),
        ethereum.Value.fromUnsignedBigInt(timelineInDays_),
        ethereum.Value.fromUnsignedBigInt(minFundingAmount_),
        ethereum.Value.fromString(deliverableMedium_),
        ethereum.Value.fromString(videoUri_)
      ]
    );

    return result[0].toAddress();
  }

  try_createCallForFunds(
    title_: string,
    description_: string,
    image_: string,
    category_: string,
    genre_: string,
    subgenre_: string,
    timelineInDays_: BigInt,
    minFundingAmount_: BigInt,
    deliverableMedium_: string,
    videoUri_: string
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createCallForFunds",
      "createCallForFunds(string,string,string,string,string,string,uint96,uint256,string,string):(address)",
      [
        ethereum.Value.fromString(title_),
        ethereum.Value.fromString(description_),
        ethereum.Value.fromString(image_),
        ethereum.Value.fromString(category_),
        ethereum.Value.fromString(genre_),
        ethereum.Value.fromString(subgenre_),
        ethereum.Value.fromUnsignedBigInt(timelineInDays_),
        ethereum.Value.fromUnsignedBigInt(minFundingAmount_),
        ethereum.Value.fromString(deliverableMedium_),
        ethereum.Value.fromString(videoUri_)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  logicAddress(): Address {
    let result = super.call("logicAddress", "logicAddress():(address)", []);

    return result[0].toAddress();
  }

  try_logicAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("logicAddress", "logicAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proxies(param0: Address): boolean {
    let result = super.call("proxies", "proxies(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBoolean();
  }

  try_proxies(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("proxies", "proxies(address):(bool)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  proxiesList(param0: BigInt): Address {
    let result = super.call("proxiesList", "proxiesList(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_proxiesList(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "proxiesList",
      "proxiesList(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get logicAddress_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateCallForFundsCall extends ethereum.Call {
  get inputs(): CreateCallForFundsCall__Inputs {
    return new CreateCallForFundsCall__Inputs(this);
  }

  get outputs(): CreateCallForFundsCall__Outputs {
    return new CreateCallForFundsCall__Outputs(this);
  }
}

export class CreateCallForFundsCall__Inputs {
  _call: CreateCallForFundsCall;

  constructor(call: CreateCallForFundsCall) {
    this._call = call;
  }

  get title_(): string {
    return this._call.inputValues[0].value.toString();
  }

  get description_(): string {
    return this._call.inputValues[1].value.toString();
  }

  get image_(): string {
    return this._call.inputValues[2].value.toString();
  }

  get category_(): string {
    return this._call.inputValues[3].value.toString();
  }

  get genre_(): string {
    return this._call.inputValues[4].value.toString();
  }

  get subgenre_(): string {
    return this._call.inputValues[5].value.toString();
  }

  get timelineInDays_(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get minFundingAmount_(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get deliverableMedium_(): string {
    return this._call.inputValues[8].value.toString();
  }

  get videoUri_(): string {
    return this._call.inputValues[9].value.toString();
  }
}

export class CreateCallForFundsCall__Outputs {
  _call: CreateCallForFundsCall;

  constructor(call: CreateCallForFundsCall) {
    this._call = call;
  }

  get proxy(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}
