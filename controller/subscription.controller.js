import Subscription from "../models/subscription.model.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";
export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflow/subscription/remainder`,
      body: {
        subscriptionId: subscription._id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
      workflowRunId,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      const error = new Error("You are not authorized to access this resource");
      error.statusCode = 403;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
