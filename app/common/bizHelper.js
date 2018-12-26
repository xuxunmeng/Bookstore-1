function bookInfoMap(res) {
  const processedResult = {
    cover: res.fmdt,
    isbn: res.isbn,
    spbs: res.spbs,
    name: res.sm,
    author: res.author,
    catalog: res.yxxlmc, // 分类
    toc: res.ml, // 目录,
    price: res.dj,
    pricing: res.dj,
    recommender: res.tjy, // 推荐语
    intro: res.tjy, // 介绍
    pageType: res.kb,
    pageNum: res.ys,
    publish: res.bb,
    version: '',
    bookshelf: '',
    qrcode: res.qrcode,
  }
  return Object.assign({}, processedResult)
}

module.exports = {
  bookInfoMap,
}