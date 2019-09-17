/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

/// <reference types="truffle-typings" />

import * as TruffleContracts from ".";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "Bushel"): TruffleContracts.BushelContract;
      require(name: "Context"): TruffleContracts.ContextContract;
      require(name: "ERC20"): TruffleContracts.ERC20Contract;
      require(name: "ERC20Detailed"): TruffleContracts.ERC20DetailedContract;
      require(name: "ERC20Mintable"): TruffleContracts.ERC20MintableContract;
      require(name: "IERC20"): TruffleContracts.IERC20Contract;
      require(name: "Migrations"): TruffleContracts.MigrationsContract;
      require(name: "MinterRole"): TruffleContracts.MinterRoleContract;
      require(name: "Ownable"): TruffleContracts.OwnableContract;
    }
  }
}
