"use strict";

import redis from "../config/redis/redis.config.js";
import logger from "../utility/logger.utility.js";

const SAddDTO = async (setKey, value) => {
  try {
    const rData = await redis.client.sAdd(setKey, value);
    return rData;
  } catch (error) {
    logger.error({ SAddDTO: error.message });
    throw new Error(error.message);
  }
};

const SIsMemberDTO = async (setKey, value) => {
  try {
    const rData = await redis.client.sIsMember(setKey, value);
    return rData;
  } catch (error) {
    logger.error({ SIsMemberDTO: error.message });
    throw new Error(error.message);
  }
};

const HSetDTO = async (hashKey, key, value) => {
  try {
    const rData = await redis.client.hSet(hashKey, key, value);
    return rData;
  } catch (error) {
    logger.error({ HSetDTO: error.message });
    throw new Error(error.message);
  }
};

const HGetDTO = async (hashKey, key) => {
  try {
    const rData = await redis.client.hGet(hashKey, key);
    return rData;
  } catch (error) {
    logger.error({ HGetDTO: error.message });
    throw new Error(error.message);
  }
};

const HDelDTO = async (hashKey, key) => {
  try {
    const rData = await redis.client.hDel(hashKey, key);
    return rData;
  } catch (error) {
    logger.error({ HDelDTO: error.message });
    throw new Error(error.message);
  }
};


const RPushDTO = async (hashKey, value) => {
  try {
    const rData = await redis.client.rPush(hashKey, value);
    return rData;
  } catch (error) {
    logger.error({ RPushDTO: error.message });
    throw new Error(error.message);
  }
};


const LRangeALLDTO = async (hashKey) => {
  try {
    const rData = await redis.client.lRange(hashKey, 0,-1);
    return rData;
  } catch (error) {
    logger.error({ LRangeALLDTO: error.message });
    throw new Error(error.message);
  }
};

const DelKeyDTO = async (hashKey) => {
  try {
    const rData = await redis.client.del(hashKey);
    return rData;
  } catch (error) {
    logger.error({ DelKeyDTO: error.message });
    throw new Error(error.message);
  }
};





const RedisDTO = {
  SAddDTO,
  HSetDTO,
  HDelDTO,
  HGetDTO,
  SIsMemberDTO,
  RPushDTO,
  LRangeALLDTO,
  DelKeyDTO,
};

export default RedisDTO;
