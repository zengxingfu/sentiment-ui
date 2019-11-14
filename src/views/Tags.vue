<template>
  <div class="container">
    <div class="tag-table mdl-card mdl-shadow--2dp">
      <div class="card-title">
        <span class="title-text" style="">比较</span>
        <input type="date" name="user_date" v-model="tagDate" />
      </div>
      <div class="card-content">
        <div class="c-1-3">
          <canvas id="myChart" ref="chart1"></canvas>
        </div>
        <div class="c-1-3">
          <div class="weibo-selector">
            <span>当前微博：</span>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <table class="mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Material</th>
                <th>Quantity</th>
                <th>Unit price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Plywood (Birch)
                </td>
                <td>50</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Plywood (Birch)
                </td>
                <td>50</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Laminate (Gold on Blue)
                </td>
                <td>10</td>
                <td>$2.35</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Plywood (Birch)
                </td>
                <td>50</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Laminate (Gold on Blue)
                </td>
                <td>10</td>
                <td>$2.35</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="c-1-3">
          <div class="weibo-selector">
            <span>当前微博：</span>
            <select>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <table class="mdl-data-table mdl-js-data-table">
            <thead>
              <tr>
                <th class="mdl-data-table__cell--non-numeric">Material</th>
                <th>Quantity</th>
                <th>Unit price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Plywood (Birch)
                </td>
                <td>50</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Plywood (Birch)
                </td>
                <td>50</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Laminate (Gold on Blue)
                </td>
                <td>10</td>
                <td>$2.35</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Plywood (Birch)
                </td>
                <td>50</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Laminate (Gold on Blue)
                </td>
                <td>10</td>
                <td>$2.35</td>
              </tr>
              <tr>
                <td class="mdl-data-table__cell--non-numeric">
                  Acrylic (Transparent)
                </td>
                <td>25</td>
                <td>$2.90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <div class="mdl-card__supporting-text"></div> -->
    </div>
    <div class="trend mdl-card mdl-shadow--2dp">
      <div class="card-title">
        <span class="title-text">趋势</span>
        <input type="radio" name="period" :value="7" v-model="trend.period" />
        7天
        <input type="radio" name="period" :value="30" v-model="trend.period" />
        30天
      </div>
      <div class="card-content">
        <canvas ref="chart2"></canvas>
        <!-- <div class="period-selector"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Chart from 'chart.js'
import dayjs from 'dayjs'
export default {
  name: 'Tags',
  data() {
    return {
      tagDate: null,
      trend: {
        period: 7
      },
      testData: {
        人民日报: 7,
        央视新闻: 6,
        新京报我们视频: 4,
        中国新闻网: 5,
        澎湃新闻: 3,
        人民网: 1
      }
    }
  },
  created() {
    this.tagDate = dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
  },
  mounted() {
    this.drawBarChart()
    this.drawLineChart()
  },
  methods: {
    drawLineChart() {
      let ctx = this.$refs['chart2']
      let housingChange = {
        type: 'line',
        data: {
          labels: [
            '1987年',
            '1988年',
            '1989年',
            '1990年',
            '1991年',
            '1992年',
            '1993年',
            '1994年',
            '1995年',
            '1996年',
            '1997年',
            '1998年',
            '1999年',
            '2000年',
            '2001年',
            '2002年',
            '2003年',
            '2004年',
            '2005年',
            '2006年',
            '2007年',
            '2008年',
            '2009年',
            '2010年',
            '2011年',
            '2012年',
            '2013年',
            '2014年',
            '2015年',
            '2016年',
            '2017年'
          ],
          datasets: [
            {
              label: '香港岛',
              backgroundColor: '#3F51B5',
              borderColor: '#3F51B5',
              data: [
                56500,
                60000,
                61853,
                65903,
                66934,
                64022,
                63543,
                78208,
                79150,
                80754,
                84271,
                77974,
                67708,
                69322,
                67353,
                65427,
                65427,
                65405,
                65284,
                64506,
                66710,
                61118,
                61713,
                61605,
                62993,
                62884,
                62654,
                62384,
                62028,
                61831,
                61835
              ],
              fill: false
            },
            {
              label: '九龙',
              backgroundColor: '#ED7D31',
              borderColor: '#ED7D31',
              data: [
                275300,
                272400,
                273375,
                263288,
                265124,
                251103,
                246336,
                262893,
                261074,
                263567,
                254876,
                249886,
                241166,
                248001,
                236897,
                232172,
                232172,
                229204,
                240972,
                240667,
                239869,
                240319,
                249147,
                255034,
                259390,
                269248,
                276315,
                291768,
                291095,
                290941,
                303118
              ],
              fill: false
            },
            {
              label: '沙田',
              backgroundColor: '#A5A5A5',
              borderColor: '#A5A5A5',
              data: [
                51000,
                56700,
                61674,
                62925,
                63413,
                63459,
                65593,
                70815,
                70833,
                71486,
                72382,
                67781,
                61873,
                55860,
                53692,
                50439,
                50439,
                50305,
                50252,
                54136,
                53996,
                53804,
                56015,
                57784,
                57599,
                59927,
                60822,
                62007,
                61646,
                65670,
                72200
              ],
              fill: false
            },
            {
              label: '屯门',
              backgroundColor: '#FFC000',
              borderColor: '#FFC000',
              data: [
                46100,
                48700,
                52364,
                58001,
                58001,
                57990,
                57990,
                57991,
                57997,
                57993,
                57993,
                56093,
                54184,
                58570,
                52636,
                53612,
                53612,
                53623,
                57223,
                58018,
                58061,
                58234,
                58463,
                58625,
                58280,
                58061,
                57293,
                57594,
                56409,
                55622,
                54934
              ],
              fill: false
            },
            {
              label: '新界其他地区',
              backgroundColor: '#5B9BD5',
              borderColor: '#5B9BD5',
              data: [
                137400,
                152500,
                170545,
                184756,
                193193,
                203086,
                213732,
                219450,
                224018,
                224505,
                233777,
                227238,
                225828,
                221183,
                229016,
                232559,
                232559,
                249907,
                254899,
                264989,
                259168,
                260350,
                268761,
                270560,
                269795,
                272248,
                270874,
                269924,
                272959,
                276216,
                277265
              ],
              fill: false
            }
          ]
        },
        options: {
          // responsive: true,
          aspectRatio: 6,
          title: {
            display: false,
            text: '1987年-2017年香港各区公屋单位数目变化'
          },
          dataSource: {
            text: '香港房屋委员会年报'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Month'
                }
              }
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: '单位数目'
                },
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
      new Chart(ctx, housingChange)
    },
    drawBarChart() {
      const data = []
      const labels = []
      for (let key in this.testData) {
        labels.push(key)
        data.push(this.testData[key])
      }
      const ctx = this.$refs['chart1']
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '当日热搜数',
              data,
              backgroundColor: 'rgba(64, 81, 182, 0.75)',
              borderColor: 'rgb(64, 81, 182)',
              borderWidth: 1
            }
          ]
        },
        options: {
          aspectRatio: 1,
          // maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
.container {
  height: calc(100vh - 96px);
}
.card-title {
  margin: 1rem;
}
.title-text {
  margin-right: 1rem;
  font-size: 20px;
}
.card-content {
  width: 100%;
  padding: 0 1rem;
}
.card-content .c-1-3 {
  width: 30%;
  float: left;
  padding: 0 1rem;
  height: 100%;
  overflow-y: auto;
}
.weibo-selector {
  margin-bottom: 0.875rem;
}
.tag-table {
  width: 100%;
  height: 61.8%;
}
canvas {
  height: 100%;
}
table {
  width: 100%;
}
.trend {
  width: 100%;
  height: calc(38.2% - 1rem);
  margin-top: 1rem;
}
.period-selector {
  text-align: center;
  margin-bottom: 0.5rem;
}
</style>
