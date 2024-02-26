import { Account } from "../models/account.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
const getBalance = asyncHandler(async (req, res) => {
  const userBalance = await Account.findOne({ userId: req.user._id });

  if (!userBalance) {
    throw new ApiError(400, "user not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userBalance, "Account Detail Fetch Successfully")
    );
});

const transferMoney = asyncHandler(async (req,res)=>{
// start session so either both done or both fail
    const session = await mongoose.startSession();

    session.startTransaction();
    const {to,amount} = req.body

    const account = await Account.findOne({
        userId:req.user._id
    }).session(session);

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json(new ApiResponse(400,"Invalid Account"))
    }
    
    if(!account || account.balance<amount)
    {
        await session.abortTransaction();
        return res.status(400).json(new ApiResponse(400,"Insufficient balance"))
    }

   
    
     await Account.updateOne({ userId:req.user._id },{ $inc: { balance: -amount } }).session(session);
    
   await Account.updateOne({userId:to},{ $inc :{ balance: amount } }).session(session);

    await session.commitTransaction();
    
    res.json(new ApiResponse(200,{account,toAccount},"Transfer Successful"))

})

export { getBalance,transferMoney };
