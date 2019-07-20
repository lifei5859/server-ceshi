const Router = require('koa-router');
const path = require('path');
const {HTTP_HOST, HTTP_UPLOAD} = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
const db = require('../../../libs/database')
// const moment = require('moment');
function serverRouter () {
    let router = new Router();

        router.get('/queryArt', async (ctx) => {
            let {page, pageSize} = ctx.query;
            // ctx.assert( page != undefined || pageSize != undefined, 404, common.resJson(0, '参数错误'));
            if (page === 0) {
                ctx.throw
            }
            let arg = pageSize ? [page * pageSize, Number(pageSize)] : [];
            let data = pageSize ? await ctx.db.query(`select * from blog_articles order by id desc limit ?, ?;`, arg) : await ctx.db.query(`select * from blog_articles order by id desc;`);
            ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
            ctx.body = common.resJson(1, data);
        })
    // function queryNowHots (success) {
    //     let querySql = 'select * from blog_articles order by views desc limit 0, 9;'
    //     let connect = dao.createConnection()
    //     let arg = []
    //     connect.connect()
    //     connect.query(querySql, arg, (err, result) => {
    //         if(err) {
    //             throw Error (`数据查询错误: ${err}`)
    //         } else {
    //             success(result)
    //         }
    //     })
    //     connect.end()
    // }
    // function queryCount (success) {
    //     let querySql = 'select count(1) as count from blog_articles;'
    //     let connect = dao.createConnection()
    //     let arg = []
    //     connect.connect()
    //     connect.query(querySql, arg, (err, result) => {
    //         if(err) {
    //             throw Error (`数据查询错误: ${err}`)
    //         } else {
    //             console.log(result)
    //             success(result)
    //         }
    //     })
    //     connect.end()
    // }
    router.get('/queryCount', async (ctx) => {
       let data = await ctx.db.query(`select count(1) as count from blog_articles;`);
       ctx.body = common.resJson(1, data);
    });
    //根据标签查找相映射的文章id
    async function queryMappingByTag (query) {
        let {page, pageSize, tid} = query;
        let arg = [Number(tid), parseInt(pageSize) * page, parseInt(pageSize)];
        let data = await db.query('select * from tag_blog_mapping where tag_id=? order by id desc limit ?, ?;', arg);
        return data;
    }
    //拿到映射值后根据映射查找文章
    async function queryArticleById (arg) {
        if (typeof arg === 'number') {
            let data = await db.query('select * from blog_articles where id=?;', [arg]);
            return data;
        } else {
            let artArr = []
            for (let i = 0; i < arg.length; i++) {
                let data = await db.query('select * from blog_articles where id=?;', [arg[i].blog_id]);
                artArr.push(data[0]);
                if (arg.length === artArr.length) {
                    return artArr;
                }
            }
        }
    }
    //根据标签查找文章
    router.get('/queryMappingByTag', async ctx => {
        let query = ctx.query;
        let mapping = await queryMappingByTag(query);
        let artArr = await queryArticleById(mapping);
        ctx.body = common.resJson(1, artArr);

    });
    //根据id查询文章详情
    router.get('/queryArtById', async ctx => {
        let { bid } = ctx.query;
        bid = Number(bid);
        let data = await queryArticleById(bid);
        ctx.body = common.resJson(1, data);
        // let data = ctx.db.query(`select * from blog_articles  `)
    });
    // function queryMappingByTag (request, response) {
    //     let params = url.parse(request.url, true).query
    //     mapping.queryBlogIdByTag(Number(params.tid), parseInt(params.page), parseInt(params.pageSize), resp => {
    //         let temp = []
    //         let result = []
    //         resp.forEach( item => {
    //             temp.push(item['blog_id'])
    //         })
    //         temp.forEach(item => {
    //             article.queryArtById(item, resp => {
    //                 let obj = resp[0]
    //                 //因为查询过程为异步所以这里通过定时器将数据push进数组
    //                 setTimeout(function () {
    //                     result.push(obj)
    //                     console.log()
    //                     //当查询参数与返回数据长度相同则向客户端返回数据
    //                     if (result.length === temp.length) {
    //                         response.writeHead(200)
    //                         response.end(respUtil('success', '成功', result))
    //                     }
    //                 },)
    //             })
    //         })
    //     })
    // }
    // router.get('/queryMappingByTag', async ctx => {
    //     let params = ctx.query;
    //     console.log(params);
    // });

    router.get('/queryNowHots', async (ctx) => {
        let data = await ctx.db.query(`select * from blog_articles order by views desc limit 0, 9;`);
        ctx.body = common.resJson(1, data);
    });
        return router.routes();
    }
// function queryBlogByKeyword (keyword, success) {
//     let querySql = 'select * from blog_articles where concat(title, tags) like "%"?"%";'
//     let connect = dao.createConnection()
//     let arg = [keyword]
//     connect.connect()
//     connect.query(querySql, arg, (err, result) => {
//         if(err) {
//             throw Error (`数据查询错误: ${err}`)
//         } else {
//             console.log(result)
//             success(result)
//         }
//     })
//     connect.end()
// }


module.exports = serverRouter();
