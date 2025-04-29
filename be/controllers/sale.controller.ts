import { format } from "date-fns";
import type { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import ApiResponse from "../lib/ApiResponse";
import { HttpStatusCode } from "../lib/const";
// import { Sale } from "../models/sale.model";