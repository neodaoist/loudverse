// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class CallForFunding extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("creator", Value.fromString(""));
    this.set("title", Value.fromString(""));
    this.set("description", Value.fromString(""));
    this.set("category", Value.fromString(""));
    this.set("genre", Value.fromString(""));
    this.set("subgenre", Value.fromString(""));
    this.set("timelineInDays", Value.fromBigInt(BigInt.zero()));
    this.set("minFundingAmount", Value.fromBigInt(BigInt.zero()));
    this.set("deliverableMedium", Value.fromString(""));
    this.set("fundingState", Value.fromI32(0));
    this.set("currentRoundFundsReceived", Value.fromBigInt(BigInt.zero()));
    this.set("lifetimeFundsReceived", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save CallForFunding entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save CallForFunding entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("CallForFunding", id.toString(), this);
    }
  }

  static load(id: string): CallForFunding | null {
    return changetype<CallForFunding | null>(store.get("CallForFunding", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): string {
    let value = this.get("creator");
    return value!.toString();
  }

  set creator(value: string) {
    this.set("creator", Value.fromString(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get image(): string | null {
    let value = this.get("image");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set image(value: string | null) {
    if (!value) {
      this.unset("image");
    } else {
      this.set("image", Value.fromString(<string>value));
    }
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get genre(): string {
    let value = this.get("genre");
    return value!.toString();
  }

  set genre(value: string) {
    this.set("genre", Value.fromString(value));
  }

  get subgenre(): string {
    let value = this.get("subgenre");
    return value!.toString();
  }

  set subgenre(value: string) {
    this.set("subgenre", Value.fromString(value));
  }

  get timelineInDays(): BigInt {
    let value = this.get("timelineInDays");
    return value!.toBigInt();
  }

  set timelineInDays(value: BigInt) {
    this.set("timelineInDays", Value.fromBigInt(value));
  }

  get minFundingAmount(): BigInt {
    let value = this.get("minFundingAmount");
    return value!.toBigInt();
  }

  set minFundingAmount(value: BigInt) {
    this.set("minFundingAmount", Value.fromBigInt(value));
  }

  get deliverableMedium(): string {
    let value = this.get("deliverableMedium");
    return value!.toString();
  }

  set deliverableMedium(value: string) {
    this.set("deliverableMedium", Value.fromString(value));
  }

  get deliverableURI(): string | null {
    let value = this.get("deliverableURI");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set deliverableURI(value: string | null) {
    if (!value) {
      this.unset("deliverableURI");
    } else {
      this.set("deliverableURI", Value.fromString(<string>value));
    }
  }

  get deliverableToken(): string | null {
    let value = this.get("deliverableToken");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set deliverableToken(value: string | null) {
    if (!value) {
      this.unset("deliverableToken");
    } else {
      this.set("deliverableToken", Value.fromString(<string>value));
    }
  }

  get fundingState(): i32 {
    let value = this.get("fundingState");
    return value!.toI32();
  }

  set fundingState(value: i32) {
    this.set("fundingState", Value.fromI32(value));
  }

  get contributions(): Array<string> {
    let value = this.get("contributions");
    return value!.toStringArray();
  }

  set contributions(value: Array<string>) {
    this.set("contributions", Value.fromStringArray(value));
  }

  get currentRoundFundsReceived(): BigInt {
    let value = this.get("currentRoundFundsReceived");
    return value!.toBigInt();
  }

  set currentRoundFundsReceived(value: BigInt) {
    this.set("currentRoundFundsReceived", Value.fromBigInt(value));
  }

  get lifetimeFundsReceived(): BigInt {
    let value = this.get("lifetimeFundsReceived");
    return value!.toBigInt();
  }

  set lifetimeFundsReceived(value: BigInt) {
    this.set("lifetimeFundsReceived", Value.fromBigInt(value));
  }

  get videoUri(): string | null {
    let value = this.get("videoUri");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set videoUri(value: string | null) {
    if (!value) {
      this.unset("videoUri");
    } else {
      this.set("videoUri", Value.fromString(<string>value));
    }
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save User entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get callsForFunds(): Array<string> {
    let value = this.get("callsForFunds");
    return value!.toStringArray();
  }

  set callsForFunds(value: Array<string>) {
    this.set("callsForFunds", Value.fromStringArray(value));
  }

  get contributions(): Array<string> {
    let value = this.get("contributions");
    return value!.toStringArray();
  }

  set contributions(value: Array<string>) {
    this.set("contributions", Value.fromStringArray(value));
  }
}

export class Contribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("callForFunds", Value.fromString(""));
    this.set("user", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Contribution entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Contribution", id.toString(), this);
    }
  }

  static load(id: string): Contribution | null {
    return changetype<Contribution | null>(store.get("Contribution", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get callForFunds(): string {
    let value = this.get("callForFunds");
    return value!.toString();
  }

  set callForFunds(value: string) {
    this.set("callForFunds", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value!.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
