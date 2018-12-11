const validates = require('../validates')

module.exports = {
  /**
   * validate data with rules
   *
   * @param  {Object} validateKey  - validate rule object, see [parameter](https://github.com/node-modules/parameter)
   * @param  {Object} [data] - validate target, default to `this.request.body`
   */
  validate(validateKey, data) {
    data = data || this.request.body
    if (!validates[validateKey]) throw new Error(`Unknown validate key ${validateKey}`)
    const errors = this.app.validator.validate(validates[validateKey], data)
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      })
    }
  },
  // 获取登陆的用户, 如果没有则为空
  getLoginUser() {
    return this.session.user
  },
  // 获取登陆的用户id，如果没有则为空
  getLoginUserId() {
    const user = this.session.user
    if (user) return user.id
    return null
  },
}