const { Service } = require('egg')

const DB = 'terminals'
class Terminal extends Service {
  async findAll(params) {
    // const results = await this.app.mysql.select('posts', { // 搜索 post 表
    //   where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
    //   columns: ['author', 'title'], // 要查询的表字段
    //   orders: [['created_at','desc'], ['id','desc']], // 排序方式
    //   limit: 10, // 返回数据量
    //   offset: 0, // 数据偏移量
    // });
    if (!params.store) {
      throw new Error('终端无法获取对应门店id')
    }
    if ((!params.name && !params.type)) {
      const items = await this.app.mysql.query(`
select terminals.*, view_configs.note as view_configs_note from \`terminals\` left join \`view_configs\`
  on terminals.view_config = view_configs.id
  where terminals.deleted = 0 and terminals.store = ${Number(params.store)}`)
      return { items }
    }
    if ((params.name && !params.type)) {
      const items = await this.app.mysql.query(`
select terminals.*, view_configs.note as view_configs_note from \`terminals\` left join \`view_configs\`
  on terminals.view_config = view_configs.id
  where terminals.deleted = 0 and terminals.store = ${Number(params.store)} and terminals.name like '%${params.name}%'`)
      return { items }
    }
    if ((!params.name && params.type)) {
      const items = await this.app.mysql.query(`
select terminals.*, view_configs.note as view_configs_note from \`terminals\` left join \`view_configs\`
  on terminals.view_config = view_configs.id
  where terminals.deleted = 0 and terminals.store = ${Number(params.store)} and terminals.type = ${Number(params.type)}`)
      return { items }
    }
    if ((params.name && params.type)) {
      const items = await this.app.mysql.query(`
select terminals.*, view_configs.note as view_configs_note from \`terminals\` left join \`view_configs\`
  on terminals.view_config = view_configs.id
  where terminals.deleted = 0 and terminals.store = ${Number(params.store)} and terminals.type = ${Number(params.type)} and terminals.name like '%${params.name}%'`)
      return { items }
    }
    return null
  }

  async findOne(id) {
    const item = await this.app.mysql.get(DB, { id, deleted: 0 })
    return item
  }

  async create(params) {
    const { name, note, store, type, config = {} } = params
    const result = await this.app.mysql.insert(DB, {
      name,
      note,
      store,
      type,
      config,
    })
    return result.affectedRows === 1
  }

  async update(params) {
    // const { id, name, note, view_config, type } = params
    const { id } = params
    const row = {
      id,
      ...params,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }

  async remove(id) {
    const row = {
      id,
      deleted: 1,
    }
    const result = await this.app.mysql.update(DB, row)
    return result.affectedRows === 1
  }
}

module.exports = Terminal
