const logoutController = (_, res) => {
  return res.clearCookie("access_token").sendStatus(200)
}

export default logoutController
