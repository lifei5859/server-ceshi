// const Router = require('koa-router');
// const path = require('path');
// const fs = require('await-fs');
// const common = require('../../libs/common');
// const {PASS_SUFFIX, HTTP_HOST, HTTP_UPLOAD} = require('../../config');
const renderList = require('../../libs/list');

const list = 'demo_list';
const tableConf = [
    {title: '标题', name: 'demo_title', type: 'text'},
    {title: '描述', name: 'demo_describe', type: 'textarea'},
    {title: '演示链接', name: 'demo_link', type: 'text'},
    {title: '主运行平台', name: 'main_platform', type: 'text'},
    {title: '是否响应式', name: 'is_self_adaption', type: 'radio'},
    {title: '使用技术', name: 'admin_technology', type: 'text'},
    {title: 'github', name: 'git_link', type: 'text'},
    {title: '类型', name:'type', type:'select', list:[{ID:'dome', title:'dome'}, {ID: 'project', title: 'project'}, {ID: 'module', title:'module'}]}
];
const page_type = 'demoList';
// const page_types={
//     'banner': 'banner管理',
//     'catalog': '类目管理',
//     'article': '文章管理',
// };
const title = 'demo管理';

module.exports = renderList(tableConf, list, title, page_type);
// let router = new Router();

// router.get('/', async ctx => {
//     const data = await ctx.db.query(`SELECT * FROM ${list}`);
//     try {
//         await ctx.render('admin/index', {
//         title,
//         tableConf,
//         page_types,
//         page_type,
//         data
//         });
//     } catch (e) {
//         console.log(e)
//         ctx.body = { err: 1, msg: 'server error' }
//     }
// });
// router.post('/list', async ctx => {
//     let {title, serial_num, src, img_src} = ctx.request.fields;
//     img_src = path.basename(img_src[0].path);
//     await ctx.db.query(`INSERT INTO ${list} (title, serial_num, src, img_src) VALUES(?,?,?,?)`, [title, serial_num, src, img_src]);
//     ctx.body = common.resJson(1, '添加成功');
// });

// router.get('/getList/:id', async ctx => {
//     let {id} = ctx.params;
//     let data = await ctx.db.query(`SELECT * FROM ${list} WHERE ID=?`, [Number(id)]);
//     ctx.assert(data.length, 400, common.resJson(0, '数据错误'));
//     ctx.body = common.resJson(1, data[0]);
// });

// router.post('/update/:id', async ctx => {
//     let {id} = ctx.params;
//     let {img_src} = ctx.request.fields;
//     let size = img_src[0].size;
//     img_src = path.basename(img_src[0].path);
//     let post = ctx.request.fields;
//     let data = await ctx.db.query(`SELECT img_src FROM ${list} WHERE ID=?`, [Number(id)]);
//     ctx.assert(data.length, 500, common.resJson(0, '数据错误'));
//     let oldImg = data[0]['img_src'];
//     let keys = ['title', 'serial_num', 'src'];
//     let values = [];
//     if (size) {
//         keys.push('img_src');
//         await common.remove(path.resolve(HTTP_UPLOAD, oldImg));
//         post.img_src = img_src;
//     } else {
//         await common.remove(path.resolve(HTTP_UPLOAD, img_src));
//     }
//     keys.forEach(item => {
//         values.push(post[item]);
//     });
//     await ctx.db.query(`UPDATE ${list} SET ${
//         keys.map(key => {
//             return `${key}=?`
//         }).join(',')
//     } WHERE ID=? `, [...values, Number(id)]);
//     ctx.body = common.resJson(1, '修改成功');
// });

// router.get('/delete/:id', async ctx => {
//     try {
//         let {id} = ctx.params;
//         let data = await ctx.db.query(`SELECT img_src FROM ${list} WHERE ID=?`, [Number(id)]);
//         ctx.assert(data.length, 400, common.resJson(0, '数据错误'));
//         let img_path = path.resolve(HTTP_UPLOAD, data[0]['img_src'])
//         fs.stat(img_path, async function(err) {
//             if (!err) {
//                 await common.remove(path.resolve(HTTP_UPLOAD, data[0]['img_src']));
//             }
//         });
//         await ctx.db.query(`DELETE FROM ${list} WHERE ID=?`, [id]);
//         ctx.body = common.resJson(1, '删除成功');
//     } catch (e) {
//         ctx.status = 500;
//         ctx.body = common.resJson(0, '数据错误');
//     }
// });

// module.exports = router.routes();
