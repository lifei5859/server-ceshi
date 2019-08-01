const Router = require('koa-router');
const path = require('path');
// const body = require('koa-better-body');
const { HTTP_HOST, HTTP_UPLOAD } = require('../../../config');
const common = require('../../../libs/common');
const fs = require('fs');
const db = require('../../../libs/database')
// const moment = require('moment');
function serverRouter() {
    let router = new Router();
    //添加映射
    async function addMapping(db, tagIds, articleId) {
        tagIds.forEach(async item => {
            await db.query(`insert into tag_blog_mapping (tag_id, blog_id, ctime) values (?, ?, ?);`, [item, articleId, Date.now()]);
        });
    }
    //添加相应标签
    async function addTag(db, tags) {
        let tagIds = [];
        for (let i = 0; i < tags.length; i++) {
            let data = await db.query(`select * from tags where tag=?;`, [tags[i]]);
            if (data == null || data.length === 0) {
                let tagData = await db.query(`insert into tags (tag, ctime) values (?,?);`, [tags[i], Date.now()]);
                tagIds.push(tagData.insertId);
            } else {
                console.log(data);
                tagIds.push(data[0].id);
            }
        }
        return tagIds;
    }
    //删除文章时删除相应 映射
    async function removeArtByMapping(ctx, bid) {
        await ctx.db.query(`delete from tag_blog_mapping where blog_id=?;`, [bid]);
        return 'ok';
    }
    //添加， 修改 文章
    router.post('/addArticle', async ctx => {
        console.log(ctx.request.fields);
        let { type } = ctx.request.fields,
            artDbQuery = ``,
            arg = [],
            msg = '',
            oldTags = ''

        if (type === 'add') {
            let { title, tags, content, views } = ctx.request.fields;
            artDbQuery = `insert into blog_articles (title, tags, content, views, ctime, utime) values (?,?,?,?,?,?);`;
            arg = [title, tags, content, views, Date.now(), Date.now()];
            msg = '添加成功';
        } else {
            let { title, tags, content, bid } = ctx.request.fields;
            oldTags = await ctx.db.query(`select tags from blog_articles where id=?;`, [bid]);
            oldTags = oldTags[0].tags;
            artDbQuery = `update blog_articles set title = ? , tags = ?, content = ?, utime = ? where id = ?`;
            arg = [title, tags, content, Date.now(), Number(bid)];
            msg = '修改成功';
        }
        let data = await ctx.db.query(artDbQuery, arg);
        let articleId = data.insertId;
        if (type === 'add') {
            let { tags } = ctx.request.fields;
            tags = tags.split(',')
            let tagIds = await addTag(ctx.db, tags);
            if (tagIds.length !== 0) {
                await addMapping(ctx.db, tagIds, articleId);
            }
        } else {
            let { tags } = ctx.request.fields;
            if (tags !== oldTags) {
                tags = tags.split(',')
                await removeArtByMapping(ctx, articleId);
                let tagIds = await addTag(ctx.db, tags);
                if (tagIds.length !== 0) {
                    await addMapping(ctx.db, tagIds, articleId);
                }
            }
        }
        ctx.body = common.resJson(1, { data, msg });
    });
    //删除文章
    router.get('/removeArt', async ctx => {
        let bid = Number(ctx.query.bid);
        await ctx.db.query(`delete from blog_articles where id = ?;`, [bid]);
        let state = await removeArtByMapping(ctx, bid);
        if (state === 'ok') {
            ctx.body = common.resJson(1, { msg: '删除成功' });
        }
    });
    //图片处理
    router.post('/addImg', async ctx => {
        // body({uploadDir: `${HTTP_HOST}/upload/blog/article`})
        // console.log(ctx.request.fields.image[0].path)
        // console.log(`${HTTP_HOST}/upload/${path.basename(ctx.request.fields.image[0].path)}`)
        // path.basename(req[name][0].path)
        ctx.body = `${HTTP_HOST}/upload/${path.basename(ctx.request.fields.image[0].path)}`;
    });
    //图片删除
    router.get('/delImg', async ctx => {
        let { imgUrl } = ctx.query;
        let src = path.resolve(HTTP_UPLOAD, imgUrl);
        fs.stat(src, async err => {
            if (!err) {
                await common.remove(src);
            } else {
                console.log(err)
            }
        })
        ctx.body = common.resJson(1, {msg: '图片删除成功'});
    })
    //查询文章
    router.get('/queryArt', async (ctx) => {
        let { page, pageSize } = ctx.query;
        pageSize = Number(pageSize);
        if (page === 0) {
            ctx.throw
        }
        let arg = pageSize ? [page * pageSize, pageSize] : [];
        console.log(arg);
        let data = pageSize ? await ctx.db.query(`select * from blog_articles order by id desc limit ?, ?;`, arg) : await ctx.db.query(`select * from blog_articles order by id desc;`);
        ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
        ctx.body = common.resJson(1, data);
    });

    //查询文章总数用于分页
    router.get('/queryCount', async (ctx) => {
        let data = await ctx.db.query(`select count(1) as count from blog_articles;`);
        ctx.body = common.resJson(1, data);
    });
    //根据标签查找相映射的文章id
    async function queryMappingByTag(query) {
        let { page, pageSize, tid } = query;
        console.log(tid);
        let arg = [Number(tid), parseInt(pageSize) * page, parseInt(pageSize)];
        let data = await db.query('select * from tag_blog_mapping where tag_id=? order by id desc limit ?, ?;', arg);
        return data;
    }
    //拿到映射值后根据映射查找文章
    async function queryArticleById(arg) {
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
    //查询热门文章
    router.get('/queryNowHots', async (ctx) => {
        let data = await ctx.db.query(`select * from blog_articles order by views desc limit 0, 9;`);
        ctx.body = common.resJson(1, data);
    });
    router.get('/queryBlogByKeyword', async ctx => {
        let { K } = ctx.query;
        let data = await ctx.db.query(`select * from blog_articles where concat(title, tags) like "%"?"%";`, [K]);
        ctx.body = common.resJson(1, data);
    });
    return router.routes();
}
module.exports = serverRouter();
