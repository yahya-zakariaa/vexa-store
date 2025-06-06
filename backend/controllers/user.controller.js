import User from "../models/user.model.js";

const getUserData = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ status: "error", message: "User not found" });

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

export { getUserData };
