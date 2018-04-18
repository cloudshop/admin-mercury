import fetch from '@/config/fetch'

/**
 * 格式为：export const login = data => fetch('/admin/lgoin', data, 'POST');
 * @param：url
 * @param：data
 * @param：type
 * @returns json
 */


/**
 * 登录
 */

export const login = data => {
    return {
        "success": true,
        "data": {},
        "msg": null
    }
};

/**
 * 获取表格数据
 */

export const getTableData = () => {
    return {
        "success": true,
        "data": {
            "userData": [{
                    date: "2016-05-02",
                    gender: "1",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    gender: "1",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    gender: "0",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    gender: "1",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1516 弄"
                },
                {
                    date: "2016-05-02",
                    gender: "1",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    gender: "0",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    gender: "1",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-02",
                    gender: "1",
                    name: "王小虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1516 弄"
                },
                {
                    date: "2016-05-04",
                    gender: "1",
                    name: "王小111虎",
                    age: "19",
                    county: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        },
        "msg": null
    }
};


/**
 * 根据姓名和日期搜索
 */

export const searchData = (name, date) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});