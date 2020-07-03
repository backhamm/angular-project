import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../help.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.less']
})
export class AboutUsComponent implements OnInit {
  public currentIndex:number = 0
  public introduceList:any[]=[
    '公司简介',
    '发展历程',
    '旗下会员'
  ]
  public historyDate:any[]=[
    {
      year:2015,
      event:[
        {
          date:'5月27日',
          text:'太阳城娱乐旗下的「太阳城™」新里程及全新的「澳門百老匯™」正式开幕。'
        },
        {
          date:'3月',
          text:'太阳城娱乐邀请了本澳的零售及餐饮中小企在「澳門百老匯」内的「百老匯大街」开业，并举行了「澳門百老匯」合作品牌揭幕暨与中小企联营启动礼，标志着大型博企与本澳中小企合作的新里程。'
        },
        {
          date:'1月',
          text:'太阳城娱乐公佈两个位于澳门路氹的项目，包括旗舰「太阳城」综合渡假城迈向新里程及全新的「澳門百老匯」，将于2015年5月27日隆重推出。'
        }
      ]
    },
    {
      year:2014,
      event:[
        {
          date:'7月',
          text:'为庆祝太阳城娱乐自2004年开始营运至今迈入第十年以及旗舰「太阳城」踏入开业三周年，吕志和博士宣佈注资十三亿港元成立「太阳城娱乐集团基金会」。'
        },
      ]
    },
    {
      year:2013,
      event:[
        {
          date:'6月',
          text:'太阳城娱乐被纳入为恒生指数成份股。'
        },
      ]
    },
    {
      year:2012,
      event:[
        {
          date:'4月',
          text:'太阳城娱乐宣佈开展「太阳城」第二期工程，目标于2015年中前落成之后，将综合渡假城的面积增加接近一倍至1,000,000平方米，为澳门带来刺激的娱乐、休闲、零售及会议展览等设施。'
        },
      ]
    },
    {
      year:2011,
      event:[
        {
          date:'5月18日',
          text:'澳为庆祝太阳城娱乐自2004年开始营运至今迈入第十年以及旗舰「太阳城」踏入开业三周年，吕志和博士宣佈注资十三亿港元成立「太阳城娱乐集团基金会」。'
        },
      ]
    },
    {
      year:2006,
      event:[
        {
          date:'12月8日',
          text:'太阳城全资线上责任博彩，持澳门合法线上责任博彩牌照，受澳门博彩监察协调局监督。'
        },
        {
          date:'10月',
          text:'太阳城娱乐的旗舰星际酒店及娱乐场隆重开幕，拥有超过500间豪华客房和套房，集休闲、娱乐、酒店及旅游服务于一身，结合完善的星级设施，为客人提供一个充满亚洲魅力的世界级优质旅游娱乐新体验'
        },
        {
          date:'9月',
          text:'太阳城娱乐第四间城市娱乐会金都娱乐场开业，是集团首间位于路氹的娱乐场。'
        },
        {
          date:'4月',
          text:'太阳城娱乐第三间城巿娱乐会总统娱乐场紧接开业。'
        }, {
          date:'2月',
          text:'太阳城娱乐首间城巿娱乐会华都娱乐场开业，位置邻近港澳码头。华都娱乐场自开业后发展迅速，肯定了太阳城娱乐的未来发展方针。'
        },
      ]
    },
    {
      year:2005,
      event:[
        {
          date:'7月',
          text:'太阳城娱乐成为首间在港上市的博彩企业，进一步巩固公司的实力及为未来发展奠立基础。'
        },
      ]
    },
    {
      year:2004,
      event:[
        {
          date:'7月',
          text:'太阳城娱乐首间城巿娱乐会华都娱乐场开业，位置邻近港澳码头。华都娱乐场自开业后发展迅速，肯定了太阳城娱乐的未来发展方针。'
        },
      ]
    },
    {
      year:2004,
      event:[
        {
          date:'2月',
          text:'与美国、欧洲及亚洲等地的18家企业比拼下，太阳城娱乐场股份有限公司最终成功获得澳门政府授予博彩经营权。。'
        },
      ]
    },
  ]
  constructor(
    public service: HelpService
  ) {}

  ngOnInit() {
  }

  changeItem(i:number):void{
    this.currentIndex = i
  }
}
