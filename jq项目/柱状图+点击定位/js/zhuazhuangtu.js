var testData =[
    {
        name: "金华",
        noYJ: 3,
        yesYJ:7 ,
        markID:"jinhua",//这个是备注ID 可以是UUID 主要是为了方便根据这个id去生成div块 点击柱状图可以滑动到div块上
    },
    {
        name: "杭州",
        noYJ: 8,
        yesYJ:3 ,
        markID:"hangzhou",
    },
    {
        name: "嘉兴",
        noYJ: 4,
        yesYJ:5,
        markID:"jiaxing",
    },
    {
        name: "湖州",
        noYJ: 2,
        yesYJ:6 ,
        markID:"huzhou",
    },{
        name: "衢州",
        noYJ: 4,
        yesYJ:3 ,
        markID:"quzhou",
    },{
        name: "舟山",
        noYJ: 1,
        yesYJ:7 ,
        markID:"zhoushan",
    },{
        name: "宁波",
        noYJ: 8,
        yesYJ:0 ,
        markID:"ningbo",
    },{
        name: "温州",
        noYJ: 0,
        yesYJ:7 ,
        markID:"wenzhou",
    },{
        name: "台州",
        noYJ: 11,
        yesYJ:5 ,
        markID:"taizhou",
    },
    {
        name: "丽水",
        noYJ: 2,
        yesYJ:3 ,
        markID:"lishui",
        option:[],
    },
    ];



function getDataFn(data,type){
    let returnData = [];
    if(type =="name"){
        for ( item of data) {
            returnData.push({"value":item.name})
        }
        return returnData;
    }else if(type =="noYJ"){
        for ( item of data) {
            returnData.push({"value":item.noYJ,"type":"MY_gotoTop","markID":item.markID})
        }
        return returnData;
    }else if(type =="yesYJ"){
        for ( item of data) {
            returnData.push({"value":item.yesYJ,"type":"MY_gotoTop","markID":item.markID})
        }
        return returnData;
    }else if(type =="maxYVal"){
        let maxvalcode = 0;
        for ( item of data) {
            maxvalcode = Math.max(maxvalcode,Math.max(item.noYJ,item.yesYJ));
        }
        return Math.ceil(maxvalcode/5) *5;
    }
}
var SD_zztHtml = echarts.init(document.getElementById('SD_zzt'));
var SD_zztOP = {
title: {
text: '输电工程信息统计',
subtext: '纯属虚构',
textStyle: {
    color: '#fff'
}
},
tooltip: {
trigger: 'axis'
},
legend: {
data: ['移交', '未移交'],
textStyle: {
    color: '#fff'
}
},
toolbox: {
show: true,
feature: {
    dataView: {show: true, readOnly: false},
    magicType: {show: true, type: ['line', 'bar']},
    restore: {show: true},
    saveAsImage: {show: true}
},

},
calculable: true,
xAxis: [
{
    type: 'category',
    data: getDataFn(testData,"name"),
    axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#fff',
                    width:'2'
                    }
                   },
    axisLabel: {
                textStyle: {
                    color: '#fff'
                    }
                   }
}
],
yAxis: [
{
    type: 'value',
    min: 0,
    max: getDataFn(testData,"maxYVal"),//Y轴最大值 不设定不好看
    axisLine: {
                lineStyle: {
                    type: 'solid',
                    color:'#fff',
                    width:'2'
                    }
                   },
    axisLabel: {
                textStyle: {
                    color: '#fff'
                    }
                   }
},
],
series: [
{
    name: '移交',
    type: 'bar',
    data: getDataFn(testData,"yesYJ"),
    itemStyle:{ normal:{ color:'green' } },
    markPoint: {
        data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
        ]
    },
    markLine: {
        data: [
            {type: 'average', name: '平均值'}
        ]
    }
},
{
    name: '未移交',
    type: 'bar',
    data: getDataFn(testData,"noYJ"),
    itemStyle:{ normal:{ color:'red' } },
    markPoint: {
        data: [
            {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
            {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
        ]
    },
    markLine: {
        data: [
            {type: 'average', name: '平均值'}
        ]
    }
}
]
};




SD_zztHtml.setOption(SD_zztOP);
SD_zztHtml.on('click', function (params) {
          console.log(params)
          if(params.data.type == "MY_gotoTop"){
              //判断不严谨 需要判断div是否存在
              $("#SD_zztBox").animate({scrollTop: $("#SD_"+params.data.markID).position().top},1000);
          }
          
})

//按照规则生成表格
