import { sendAccessToken } from "./utils.js"

const refreshTokenController = (req, res) => {
  return sendAccessToken(req.currentUser, res)
}

export default refreshTokenController
