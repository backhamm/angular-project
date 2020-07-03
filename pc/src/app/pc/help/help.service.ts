import {Injectable} from '@angular/core';
import {PlatformService} from "@service/platform.service";
import {ConfigService} from '../../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  public emailValue: string;

  constructor(
    public platform: PlatformService,
    public service: ConfigService
  ) {
    this.emailValue = this.platform.emailValue;
    console.log(service);

  }

  /**
   * nav列表
   */
  navList: any[] = [
    {
      title: '常见问题',
      params: 'commonProblem',
    },
    {
      title: '关于我们',
      params: 'aboutUs',
    },
    {
      title: '联系我们',
      params: 'contactUs',
    },
    {
      title: '代理合作',
      params: 'agency',
    },
    {
      title: '如何存款',
      params: 'deposit',
    },
    {
      title: '如何取款',
      params: 'drawing',
    },
    {
      title: '下载专区',
      params: 'download',
    },
  ];
  /**
   * 关于我们公司简介数据
   */
  companyProfile: object =
    {
      title: '公司介绍',
      introduction: '太阳城娱乐集团有限公司（下称「太阳城娱乐」）是亚洲地区其中一所最具规模的综合娱乐渡假发展及营运公司，为恒生指数成份股之一。集团的附属公司太阳城娱乐场股份有限公司，于2002年获澳门特区政府授予博彩经营权，可于澳门开设及经营娱乐场业务。于2004年开始，太阳城娱乐凭藉发展四间城巿娱乐会进军澳门博彩业市场，成功在市场上为品牌打好基础，于博彩业发展迅速的澳门大展拳脚。',
      imgUrl: this.service.baseImgUrl + 'images/about/about1.png',
      companyText: [
        '博彩收益计算，澳门是全球最大的博彩娱乐市场，亦是中华人民共和国境内唯一可以合法进行博彩活动的地区。太阳城娱乐以「亚洲心」为宗旨，着重最顶级的服务质素，具备集休闲娱乐于一身的世界级设施，致力配合澳门特区政府实践可持续及适度多元发展的重要方针。',
        '太阳城全资线上责任博彩，持澳门合法线上责任博彩牌照，受澳门博彩监察协调局监督。作为澳门的良好 身心健康发展（详见企业社会责任篇幅）。',
        '太阳城娱乐现拥有及经营位于澳门半岛的旗舰超五星级星际酒店及娱乐场、经营三间城市娱乐会，及位于路氹的「太阳城™」是一项集休闲、渡假和娱乐于一身的大型综合渡假城，为澳门创建一个极具亚洲特色的渡假新胜地，进一步落实集团在澳门及区内的长远发展。',
        '太阳城娱乐旗下的旗舰项目「太阳城」新里程及全新的「澳門百老匯™」于2015年5月27日正式开幕。',
        '为成功打造全世界最顶级的综合娱乐渡假城，太阳城娱乐计划在澳门投资1,000亿港元，「太阳城」及「澳門百老匯」的总投资额已达430亿港元，此项目更是澳门自2012年后首个新开幕的综合渡假城，标志着澳门旅游业发展的新里程。',
        '太阳城娱乐早前已公布路氹地皮第三及四期的发展蓝图，地盘勘察工程预计于2017年展开。此外，集团与横琴当局就横琴一幅面积达2.7平方公里的土地订立框架协议，以发展世界级渡假胜地。',
        '此项目将与太阳城娱乐在澳门的业务相辅相成，令太阳城娱乐在同业中脱颖而出，并在支持澳门发展成为世界旅游休闲中心方面扮演重要角色。',
        '太阳城娱乐一直推动澳门的经济适度及多元发展。太阳城娱乐承诺继续履行企业社会责任，致力培育本澳人才，宣扬澳门本地文化和特色，并积极为澳门的长远繁荣稳定作出努力。'
      ],
      slogan: [
        {
          imgLogo: this.service.baseImgUrl + 'images/about/new_prospect.png',
          title: '企业使命',
          text: '我们致力成为亚洲娱乐博彩行业的翘楚，力求为顾客提供超凡的娱乐博彩体验，使员工作为公司的一份子深感自豪，亦能令与太阳城业务有关人士称心满意。'
        },
        {
          imgLogo: this.service.baseImgUrl + 'images/about/new_errand.png',
          title: '企业愿景',
          text: '本着亚洲信念亚洲心，为顾客提供超凡的娱乐博彩体验，并为行业树立典范。'
        },
        {
          imgLogo: this.service.baseImgUrl + 'images/about/new_values.png',
          title: '企业使命',
          text: '我们积极了解顾客的需求，致力提供超凡的太阳城体验，对此深感自豪。我们真诚尊重每一位与太阳城有关的人士。我们承诺全心全意地做到最好。我们贯彻审慎、高效、坚守诚信和即时应变的处事态度。'
        }
      ]

    };
  /**
   * 关于我们发展历程数据
   */
  historyDate: any[] = [
    {
      year: 2015,
      event: [
        {
          date: '5月27日',
          text: '太阳城娱乐旗下的「太阳城™」新里程及全新的「澳門百老匯™」正式开幕。'
        },
        {
          date: '3月',
          text: '太阳城娱乐邀请了本澳的零售及餐饮中小企在「澳門百老匯」内的「百老匯大街」开业，并举行了「澳門百老匯」合作品牌揭幕暨与中小企联营启动礼，标志着大型博企与本澳中小企合作的新里程。'
        },
        {
          date: '1月',
          text: '太阳城娱乐公佈两个位于澳门路氹的项目，包括旗舰「太阳城」综合渡假城迈向新里程及全新的「澳門百老匯」，将于2015年5月27日隆重推出。'
        }
      ]
    },
    {
      year: 2014,
      event: [
        {
          date: '7月',
          text: '为庆祝太阳城娱乐自2004年开始营运至今迈入第十年以及旗舰「太阳城」踏入开业三周年，吕志和博士宣佈注资十三亿港元成立「太阳城娱乐集团基金会」。'
        },
      ]
    },
    {
      year: 2013,
      event: [
        {
          date: '6月',
          text: '太阳城娱乐被纳入为恒生指数成份股。'
        },
      ]
    },
    {
      year: 2012,
      event: [
        {
          date: '4月',
          text: '太阳城娱乐宣佈开展「太阳城」第二期工程，目标于2015年中前落成之后，将综合渡假城的面积增加接近一倍至1,000,000平方米，为澳门带来刺激的娱乐、休闲、零售及会议展览等设施。'
        },
      ]
    },
    {
      year: 2011,
      event: [
        {
          date: '5月18日',
          text: '澳为庆祝太阳城娱乐自2004年开始营运至今迈入第十年以及旗舰「太阳城」踏入开业三周年，吕志和博士宣佈注资十三亿港元成立「太阳城娱乐集团基金会」。'
        },
      ]
    },
    {
      year: 2006,
      event: [
        {
          date: '12月8日',
          text: '太阳城全资线上责任博彩，持澳门合法线上责任博彩牌照，受澳门博彩监察协调局监督。'
        },
        {
          date: '10月',
          text: '太阳城娱乐的旗舰星际酒店及娱乐场隆重开幕，拥有超过500间豪华客房和套房，集休闲、娱乐、酒店及旅游服务于一身，结合完善的星级设施，为客人提供一个充满亚洲魅力的世界级优质旅游娱乐新体验'
        },
        {
          date: '9月',
          text: '太阳城娱乐第四间城市娱乐会金都娱乐场开业，是集团首间位于路氹的娱乐场。'
        },
        {
          date: '4月',
          text: '太阳城娱乐第三间城巿娱乐会总统娱乐场紧接开业。'
        }, {
          date: '2月',
          text: '太阳城娱乐首间城巿娱乐会华都娱乐场开业，位置邻近港澳码头。华都娱乐场自开业后发展迅速，肯定了太阳城娱乐的未来发展方针。'
        },
      ]
    },
    {
      year: 2005,
      event: [
        {
          date: '7月',
          text: '太阳城娱乐成为首间在港上市的博彩企业，进一步巩固公司的实力及为未来发展奠立基础。'
        },
      ]
    },
    {
      year: 2004,
      event: [
        {
          date: '7月',
          text: '太阳城娱乐首间城巿娱乐会华都娱乐场开业，位置邻近港澳码头。华都娱乐场自开业后发展迅速，肯定了太阳城娱乐的未来发展方针。'
        },
      ]
    },
    {
      year: 2002,
      event: [
        {
          date: '2月',
          text: '与美国、欧洲及亚洲等地的18家企业比拼下，太阳城娱乐场股份有限公司最终成功获得澳门政府授予博彩经营权。'
        },
      ]
    },
  ];

  /**
   * 关于我们旗下会员数据
   */
  membershipDate: object = {
    hotel: [
      {
        logImg: this.service.baseImgUrl + 'images/about/about23.jpg',
        bigImg: this.service.baseImgUrl + 'images/about/about2.png',
        leftImg: [
          this.service.baseImgUrl + 'images/about/about4.png',
          this.service.baseImgUrl + 'images/about/about5.png'
        ],
        rightImg: this.service.baseImgUrl + 'images/about/about6.png',
        introduce: [
          '星际酒店是太阳城娱乐旗下首个五星级娱乐酒店项目，座落于澳门核心商业及娱乐区－友谊大马路。这座39层楼高的酒店是以太阳城娱乐独有之亚洲智慧和经验，以及「星级」的酒店服务、娱乐设施、酒店客房和食府闻名。',
          '自2006年开幕以来，星际酒店一直深受亚洲以至世界各地的旅客所欢迎。凭着为旅客提供最专业细心的服务，星际酒店精心打造优质享受，赢得不少著名奖项，包括美国优质服务协会颁发的「五星钻石奖」、被中国饭店业领袖峰会评为「一百佳中国酒店」、及在《米芝莲指南香港澳门2014》中被誉为「顶级舒适」酒店。'
        ]
      },
      {
        logImg: this.service.baseImgUrl + 'images/about/about22.jpg',
        bigImg: this.service.baseImgUrl + 'images/about/about7.png',
        leftImg: [
          this.service.baseImgUrl + 'images/about/about8.png',
          this.service.baseImgUrl + 'images/about/about9.png',
        ],
        rightImg: this.service.baseImgUrl + 'images/about/about10.png',
        introduce: [
          '投资超过50亿港元，「澳門百老匯」汇聚澳门特色及亚洲魅力，让宾客零距离感受最地道的风情，享受一场色、声、味俱全的狂欢盛宴。',
          '宾客可从「太阳城™」穿过设计优美并配有空调的行人天桥，只需90秒便能轻松到达澳门首个汇集精彩街头表演和开放式店铺的步行街 -「澳門百老匯」，享受澳门传统美食，亲切服务以及精彩表演和热闹气氛。',
          '作为「澳門百老匯」内的一所精品酒店，「百老汇酒店」提供五星级的舒适和贴心服务。「百老汇酒店」共有320间客房及套房，与珠海横琴仅一河之隔，宾客置身其中可饱览180度的沿岸动人景致。'
        ]
      },
      {
        logImg: this.service.baseImgUrl + 'images/about/about_logo.png',
        bigImg: this.service.baseImgUrl + 'images/about/about11.png',
        leftImg: [
          this.service.baseImgUrl + 'images/about/about12.png',
          this.service.baseImgUrl + 'images/about/about13.png',
        ],
        rightImg: this.service.baseImgUrl + 'images/about/about14.png',
        introduce: [
          '「太阳城」是世界级亚洲特色的五星级综合渡假城，第一期于2011年5月15日正式开业，投资额达165亿港元，渡假城内提供超过2,200间客房及套房。「太阳城」由三大世界级酒店品牌合力创建，包括屡获殊荣的悦榕庄；享誉日本的大仓饭店，以及备受瞩目的五星级「銀河酒店TM」。「太阳城」设有50多间餐饮食肆，提供精致的亚洲美食，包括东南亚各地的地道佳肴；荟萃全球著名品牌的购物步行街；占地52,000平方米，富热带风情的绿洲花园，以及全球最大规模的空中冲浪池，面积逾4,000平方米，更有以350吨白沙铺成的人工沙滩。2015年5月27日，「太阳城」第二期及「澳門百老匯TM」的开幕，将原来版图双倍扩展至超过110万平方米，总投资额超过430亿港元，并进一步向集团的1,000亿港元投资承诺迈进。三间全新五星级酒店品牌进驻后，「太阳城」正式成为澳门唯一拥有六间世界级酒店的综合渡假城，迎合旅客的不同需求。澳门丽思卡尔顿酒店是集团旗下首间全套房式酒店，设有逾250间套房，为澳门的奢华享受重新定义；亚洲最大的澳门JW万豪酒店提供逾1,000间客房及套房；全新「百老汇酒店」的320间客房设备齐全、适合家庭旅客。「太阳城」的餐饮选择将增加至超过120间餐厅、食肆和酒吧，当中包括8间具米芝莲级的餐厅。此外，「太阳城」的全新购物热点「时尚汇」包罗超过200家时尚品牌，并首度把世界流行的高格调下午茶文化引进澳门，让客人尽享购物乐趣，同时品味生活时尚享受。',
          '「太阳城」最广受欢迎的天浪淘园，总面积扩充至超过75,000平方米，除了现有全球最大规模的空中冲浪池外，更设有全球最长、575米的空中激流。加上亚洲主题式热带园林、人工沙滩、刺激的滑水梯和瀑布，以及儿童水上游戏专区等，天浪淘园就是一家大小尽享夏日乐趣的水上乐园。'
        ]
      },
      {
        logImg: this.service.baseImgUrl + 'images/about/about22.jpg',
        bigImg: this.service.baseImgUrl + 'images/about/about15.png',
        leftImg: [
          this.service.baseImgUrl + 'images/about/about16.png',
          this.service.baseImgUrl + 'images/about/about17.png',
        ],
        rightImg: this.service.baseImgUrl + 'images/about/about18.png',
        introduce: [
          '2006年由一班精英团队所创建的线上博彩，凭藉专业而极具创意的思维，於短时间内创作出多个业界前所未有的游戏新体验，使太阳城团队迅速成为一支独秀的合法博彩游戏娱乐集团。',
          '一直以来，太阳城团队秉持「只为非同凡享」的态度，发挥无限创意，为玩家带来最高层次的享乐体验。为此，我们不断征服挑战并迈步向前，研发出更多独一无二的游戏新体验，冲破网上娱乐平台的传统束缚，引领业界不断向前。',
          '太阳城团队与时并进开拓移动装置游戏平台，让玩家无论身处何地，依然能够随时感受到逼真丶刺激，恍如置身现场的玩乐体验。我们的团队坚持缔造一个「公平丶公正丶公开丶安全」的线上博彩平台，符合并获得了澳门线上的牌照，并取得独立的第三方认证机构GLI认证，是最值得信赖的游戏娱乐集团。',
          '我们非常珍视每位客户的意见及建议，如阁下对我们的产品或服务有任何查询，请循以下途径联络我们。'
        ]
      },
    ],
    entertainmentDescro: [
      '城市娱乐会',
      '此项目将与太阳城娱乐在澳门的业务相辅相成，令太阳城娱乐在同业中脱颖而出，并在支持澳门发展成为世界旅游休闲中心方面扮演重要角色。'
    ],
    entertainment: [
      {
        imgUrl: this.service.baseImgUrl + 'images/about/about19.png',
        titleCn: '华都娱乐场',
        titleEn: 'Waldo Casino & Hotel',
        description: '自二零零四年起，太阳城娱乐先后分别与华都酒店、总统酒店、利澳酒店以及金都酒店结成合作伙伴，经营四间城巿娱乐会。二零一三年太阳城娱乐收购金都酒店并翻新成为「澳門百老匯™」，现三间城巿娱乐会分别为华都娱乐场、总统娱乐场及利澳娱乐场。'
      },
      {
        imgUrl: this.service.baseImgUrl + 'images/about/about20.png',
        titleCn: '总统娱乐场',
        titleEn: 'President Casino',
        description: '总统娱乐场于二零零六年四月开业，位于澳门半岛最繁华的中区，毗邻多间着名娱乐场、购物及商业中心。由酒店到澳门国际机场之车程仅需二十分钟，往港澳码头只需五分钟车程。'
      },
      {
        imgUrl: this.service.baseImgUrl + 'images/about/about21.png',
        titleCn: '利澳娱乐场 ',
        titleEn: 'Rio Casino',
        description: '利澳娱乐场于二零零六年初开业，位于澳门半岛市中心，距离港澳码头只需十分钟步程，往澳门国际机场亦只需十五分钟车程，地点优越，交通便利。'
      },
    ]


  };

  /**
   * 联系我们数据
   */
  contactUsDate: object = {
    title: '● 联系我们',
    list: [
      '太阳城官网的客服中心全年无休，提供1周7天、每天24小时的优质服务。',
      '如果您对本网站的使用有任何疑问，可以透过下列任一方式与客服人员联系，享受最实时的服务',
      '点击"在线客服"链接，即可进入在线客服系统与客服人员联系。',
      '您亦可使用Email与客服人员取得联系',
      '会员Email:' + this.emailValue,
      '只要填妥下列窗体并点击送出数据，我们也能收到您宝贵的意见(务必填写真实的Email.QQ.联络电话，以便我们能及时与您取得联系！'
    ],
  };
  /**
   * 联盟方案数据
   */
  allianceDate: any[] = [
    {

      title: '联盟方案',
      text: ['作为一名尊贵的太阳城联盟合作伙伴，您可以利用您的资源最快赚取高额佣金，由这一秒钟开始，您将可以轻松实现成功与财富的梦想！'],
    },
    {

      title: '联盟方案',
      text: ['太阳城目前拥有澳门、菲律宾合法注册之博彩公司。为客户提供各 种现场真人游戏、皇冠 体育、棋牌、彩票以及多元化网上娱乐。使用最公平、公正、公开的系统，在市场上的众多博彩网站中，我们自豪的提供会员最优惠的回馈，给予合作伙伴最优势的 营利回报! 无论您拥有的是网络资源，或是人脉资源，都欢迎您来加入太阳城合作伙伴的行列，无须负担任何费用，就可以开始无上限的收入。太阳城，绝对是您最明智的选择!'],
    },
    {
      isQRcode: true,
      title: '申请代理',
      QRcode: this.service.baseImgUrl + 'images/about/qq_regAgent.png',
      text: ['扫码联系在线代理专员',]
    },
    {
      title: '注册申请',
      text: ['请点击[注册代理]在线提出申请，并确实填写各项资料。太阳城会评估审核联盟申请讯息，3日内由专员与您联系开通，并提供您的注册账号、密码及推广链接,如有疑问请联系代理专员'],
      table: true,
      text1: [
        '*本公司有权更改退佣比例。',
        '上述「条件」是显示您的下线玩家每月为【太阳城】带来的总纯利收入，这关系到您佣金比例(您的佣金数目是根据玩家的每月总纯利收入所计算得出的)。'
      ],
      tableList: {
        lineOne: [
          '当月营利',
          '当月有效会员',
          '当月退佣比例'
        ],
        lineTwo: [
          '真人、电子、体育投注',
          '彩票(有效投注)'
        ],
        lineThree: [
          '100-50000',
          '5或以上',
          '30%',
          '0.1%'
        ],
        linefour: [
          '50001-300000',
          '10或以上',
          '35%'
        ],
        lineFive: [
          '300001-800000',
          '20或以上',
          '40%'
        ],
        lineSix: [
          '800001以上',
          '50或以上',
          '50%'
        ]

      }
    },
    {

      title: '回馈/佣金计算：',
      text: ['退水(前期累积+当期总退水) - 费用(前期累积+当期总费用),当相减下来有两个结果：']
    },
    {
      title: '正数 跟 负数',
      text: [
        '• 正数时：相减下来的金额+派彩(前期累积+当期总派彩)*退佣比例= 可获得佣金',
        '• 每月必须最少有5个活跃会员 (指当月于相关项目至少投注500元，每位下线会员存款不低于300)，您的分成条件才能成立。',
        '• 联盟合作伙伴负责支付所有包含博彩税收、银行交易、红利和促销活动等所产生的费用。这些费用将采取累计制，并于合作伙伴每月的佣金中相应比例扣除一部分。',
        '• 当月联盟体系【派彩/投注量/总额公点金额】，依照：视讯、BB体育、机率、彩票、运动博弈的顺序扣除相应费用',
        '• 其中包括 : 为会员优惠、存/取款相应费用(请留意：太阳城会员重复出款￥手续费/未达100%投注出款的手续费由会员承担，不纳入计算)。'
      ],
      text2: [
        '• 【当月最低有效会员】定义为，在月结区间内进行过最少三次有效下注的会员，如联盟体系当月未达【当月最低有效会员】最低门槛5人，则该月无法领取佣金回 馈。联盟体系当月赢利达到标准，而【当月最低有效会员】人数未达相应最低门槛，则该月佣金比例依照【当月最低有效会员】人数所达门槛相应的百分比进行退佣',
        '• 例： 体系当月营利为￥100000，而当月有效会员人数为5人，联盟虽达到赢利为￥100000，却未达到有效会员10人以上，故依照联盟有效会员人数5人的门槛的退佣比例核算。',
        '• A)支付费用 – 联盟合作伙伴推荐之会员所产生的银行存款、提款等支付费用。',
        '• B)优惠红利 – 联盟合作伙伴给予会员的现金红利或是折扣。',
        '• 请紧记任何使用不诚实的方法以骗取佣金将会永久冻结账户，所有佣金一概不予发还。',
        '• 例1: 加入太阳城联盟合作计划后佣金高于1元，达到最少5个活跃用户，佣金将会于该月结算后，统一为各位代理派送。（具体派送时间，请各位代理及时查看代理专员发出的最新通告。）',
        '• 例2: 假若本月佣金出现负数，将会带到下一个月继续累计，直至正数才会派送佣金。'
      ]
    },
    {
      isQRcode: false,
      title: '佣金支付方式：',
      text: ['结算期为本月第一个礼拜一至下月第一个礼拜一前的周日，将公司盈利，以联盟方案分红公式计算，扣除联盟体系会员相应的优惠、行政费用后，佣金由代理客服于每个月的第一个礼拜三开始与代理核对佣金后，在每个月的第一个礼拜五以前将佣金直接汇入代理绑定之银行账号。']
    }
  ];

  /**
   *联盟协议
   */
  protocolDate: object = {
    title: '联盟协议',
    protocolList: [
      {
        title: '一、太阳城官网对代理合作的权利与义务',
        list: [
          '太阳城官网的客服部会登记合作的会员并会观察他们的投注状况。代理及会员必须同意并遵守太阳城官网的会员条例，政策及操作程式。太阳城官网保留拒绝或冻结代理/会员帐户权利。',
          '代理合作可随时登入界面观察旗下会员的下注状况及会员在网站的活动概况。太阳城官网的客服部会根据代理合作旗下的会员计算所得的佣金。',
          '太阳城官网保留可以修改合约书上的任何条例，包括: 现有的佣金范围、佣金计划、付款程式、及参考计划条例的权利，太阳城官网会以电邮、网站公告等方法通知代理合作。代理合作对于所做的修改有异议，代理合作 可选择终止合约，或洽客服人员反映意见。 如修改后代理合作无任何异议，便视作默认合约修改，代理合作必须遵守更改后的相关规定。'
        ],
      },
      {
        title: '二、代理合作对太阳城官网的权利及义务',
        list: [
          '代理合作应尽其所能，广泛地宣传、销售及推广太阳城官网，使代理本身及太阳城官网的利润最大化。代理合作可在不违反法律下，以正面形象宣传、销售及推广太阳城官网，并有责任义务告知旗下会员所有太阳城官网的相关优惠条件及产品。',
          '代理合作选择的太阳城官网推广手法若需付费，则代理应承担该费用。',
          '任何太阳城官网相关资讯包括: 标志、报表、游戏画面、图样、文案等，代理合作不得私自复制、公开、分发有关材料，太阳城官网保留法律追诉权。如代理在做业务推广有相关需要，请随时洽太阳城官网。'
        ],
      },
      {
        title: '三、规则条款',
        list: [
          '各阶层代理合作不可在未经太阳城官网许可情况下开设双/多个的代理帐号，也不可从太阳城官网帐户或相关人士赚取佣金。请谨记任何阶层代理不能用代理帐户下注，太阳城官网有权终止并封存帐号及所有在游戏中赚取的佣金。',
          '为确保所有太阳城官网会员账号隐私与权益，太阳城官网不会提供任何会员密码，或会员个人资料。各阶层代理合作亦不得以任何方式取得会员资料，或任意登入下层会员账号，如发现代理合作有侵害太阳城官网会员隐私行为，太阳城官网有权取消代理合作红利，并取消代理合作账号。',
          '代理合作旗下的会员不得开设多于一个的帐户。太阳城官网有权要求会员提供有效的身份证明以验证会员的身份，并保留以IP判定是否重复会员的权利。如违反上述事项，太阳城官网有权终止玩家进行游戏并封存帐号及所有于游戏中赚取的佣金。',
          '4.代理合作不可为自己或其他代理下的有效投注会员,只能是公司直属下的有效投注会员, 代理每月需有5个下线有效投注（有效投注为每周至少上线3次进行正常投注），如有违反代理协议太阳城官网有权终止并封存帐号及所有在游戏中赚取的佣金。',
          '如代理合作旗下的会员因为违反条例而被禁止享用太阳城官网的游戏，或太阳城官网退回存款给会员，太阳城官网将不会分配相应的佣金给代理合作。如代理合作旗下会员存款用的信用卡、银行资料须经审核，太阳城官网保留相关佣金直至审核完成。',
          '合约内的条件会以太阳城官网通知接受代理合作加入后开始执行。太阳城官网及代理合作可随时终止此合约，在任何情况下，代理合作如果 想终止合约，都必须以书面/电邮方式提早于七日内通知太阳城官网。 代理合作的表现会3个月审核一次，如代理合作已不是现有的合作成员则本合约书可以在任何时间终止。如合作伙伴违反合约条例，太阳城官网有权立即终止合约。',
          '在没有太阳城官网许可下，代理合作不能透露及授权太阳城官网相关机密资料，包括代理合作所获得的回馈、佣金报表、计算等;代理合作有义务在合约终止后仍执行机密档及资料的保密。',
          '在合约终止后，代理合作及太阳城官网将不须要履行双方的权利及义务。终止合约并不会解除代理合作于终止合约前应履行的义务。'
        ],
      },
    ]

  };

  /**
   * 注册协议
   */
  registerPact: any[] = [
    {
      title: '一、基本条款',
      content: [
        {
          text: '为避免于本网站投注时之争议，请会员务必于进入网站前详阅本娱乐场所定之各项规则，客户一经“我同意”进入本网站进行投注时，即被视为已接受本娱乐场的所有协议与规则；',
        },
        {
          text: '会员有责任确保自己的帐户以及登入资料的保密性，以会员帐号及密码进行的任何网上投注，将被视为有效；敬请不定时做密码变更之动作；若帐号密码被盗用，进行的投注，本公司一概不负赔偿责任；',
        },
        {
          text: '本公司保留不定时更改本协定或游戏规则或保密条例，更改之条款将从更改发生后指定之日起生效，并保留一切有争议事项及最后的决策权；',
        },
        {
          text: '用户须达到居住地国家法律规定之合法年龄方可使用线上娱乐场或网站；',
        },
        {
          text: '网上投注如未能成功提交，投注将被视为无效；',
        },
        {
          text: '凡玩家于出牌途中且尚无结果前自动或强制断线时，并不影响比赛之结果；',
        },
        {
          text: '如遇发生不可抗拒之灾害，骇客入侵，网络问题造成数据丢失的情况，以本公司公告为最终方案；',
        },
        {
          text: '特此声明，本公司将会对所有的电子交易进行记录，如有任何争议，本公司将会以注单记录为准；',
        },
        {
          text: '本公司保留更改、修改现有条款或增加任何适当条款的权利，而条款改动后将会在会员端跑马灯上公布；',
        },
        {
          text: '无论在任何情况下，本公司具有最终的解释权；',
        },
        {
          text: '若经本公司发现会员以不正当手法<利用外挂程式>进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注事情发生，本公司保留权利取消该类注单以及注单产生之红利，并停用该会员帐号；',
        },
        {
          // tslint:disable-next-line:max-line-length
          text: '无风险投注包括在百家乐同时投注的庄闲，单双，大小；龙虎斗中同时投注龙虎，龙双龙单，虎双虎单；在轮盘同时投注黑红，单双，大小等相反的下注，本公司保留权利取消所有优惠、该注单以及单注产生之红利，并停用该会员账号之权利，本公司不承担对此做出任何说明及解释之责任；若本公司发现会员有重复申请帐号行为时，保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利；每位玩家、每一电子邮箱、每一电话号码、每一收款银行账号，以及共享电脑环境(例如:网吧、其他公共用电脑等)只能够拥有一个会员帐号，各项优惠只适用于每位客户在本公司唯一的帐户。所有天下网络的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，天下网络保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。天下网络赌场是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在天下网络注册、下注，为会员个人行为，天下网络不负责、承担任何相关责任。无论是个人或是团体，如有任何威胁、滥用天下网络优惠的行为，天下网络保留杈利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。客户一经注册开户，将被视为接受所有颁布在天下网络网站上的规则与条例。'
        },
      ]
    },
    {
      title: '二、真人娱乐条款',
      content: [
        {
          text: '当您下注后，请等待显示“您共下注XXXX元”，这个讯息在中间的讯息窗口可以看见；',
        },
        {
          text: '开牌后，若您已有下注，请确认您的输赢金额，这个讯息在中间的讯息窗口可以看见；',
        },
        {
          text: '您的“总下注金额”及“赢得金额”亦会每局显示于右上角的视窗中，请会员详加确认；',
        },
        {
          text: '当会员在游戏中途发生网路问题而断线，所有已被确定的投注仍然有效；会员再重新登入时，就可以查询游戏端内的“下注记录”查询发牌结果，会员的额度也会随着当局的输赢增加或减少；',
        },
        {
          text: '如果您在讯息窗口看到“开牌”的话，而您的游戏画面未显示投注金额，这代表该局您的投注不成功，这有可能下注的时间太迟或是因为网路问题而没有被系统接受；',
        },
        {
          text: '百家乐游戏在本网内设计为每手牌局前不销牌；',
        },
        {
          text: '当会员进入游戏，超过5局没下注会有提示；若您连续10局未下注的时候将会被游戏弹出至首页，请会员重新登入；若会员于下注开牌期间强行登出，帐号将被系统锁住三分钟，请会员稍后再重新登入；',
        },
        {
          text: '本网上游戏是在现场把牌通过扫描后将牌例显示在会员端荧幕上，故若牌没扫描到必将重新扫描一遍，若还是没有感应则把牌翻开由现场公务输入牌卡数码，牌例便会显示在会员端荧幕上；',
        },
        {
          text: '当荷官不小心同时从牌靴中抽出两张牌，而扫描到的不是按顺序正确的那张牌：',
          children: [
            '（a）若牌局已开牌，而结果不符，系统将根据现况决定牌的先后摆放顺序之开牌结果进行手动开牌，并换上新牌靴开始新局；',
            '（b）若牌局未开牌，则由现场公务决定牌的先后摆放顺序，牌局会如常继续；',
          ]
        },
        {
          text: '在洗牌或将牌放入牌靴过程中，有牌不慎曝光，荷官会把牌叠起并重新洗牌，牌局将重新开始；',
        },
        {
          text: '牌局进行中，未扬牌前(该张牌未于视讯显示点数花色前)，牌不慎离开台面，牌丢落地上，或离开视讯范围，则该牌局予以注销作废，所有下注本金退回；',
        },
        {
          text: '若该牌已经过扫描且已扬牌后，该牌不慎离开台面，牌丢落地上，或离开视讯范围，因其不影响游戏之正确结果，牌由现场工务摆回后，该牌局正常行其结果仍视为有效；',
        },
        {
          text: '派错牌例（已不须补牌，荷官仍补牌）现场工务会把多补的那张牌放到牌靴底，牌局结果依视讯显示为准，牌局将如常进行；若该张多补的牌已亮开，公务将在做完以上同样程序后换上新牌靴，牌局会重新开始；',
        },
        {
          text: '荷官未依闲、庄发牌正确顺序将牌放错位置，由工务将牌依正确顺序摆放回位置后牌局将照常继续；',
        },
        {
          text: '开牌过程中，牌有感应但无显示，荷官已亮牌（如:已派出数张牌，但第一张牌有感应但未显示，至第二、三张牌显示在错误的闲、庄位置上），现场工务会依牌的正确次序输入代码，牌局将如常继续；',
        },
        {
          text: '同一张牌，扫描了一次出现2张（闲、庄位置各一张）',
          children: [
            '（a）若牌局已开牌，而结果不符，系统将根据视讯荷官完成该局之正确结果进行手动开牌，牌局也将在牌路无误的情况下如常继续；',
            '（b）若牌局未开牌，荷官避开扫描如常开牌后，工务将输入牌之正确数码，并修正不符那张牌的花色、点数，牌局会如常继续；',
          ]
        },
        {
          text: '电脑、扫描器出现异常、牌局中断、牌无法扫描又无法输入牌卡数码时，那一个牌局便会作废，所有程式将被关闭，并重开程式，牌局将重新开始；但若荷官发牌视讯已有结果，则以视讯开牌为主，会由系统完成开配；',
        },
        {
          text: '有关例行性维护、网路问题、视讯中断、牌局作废、注销情况等事宜，皆可于会员端左上角处公告栏上得知最新讯息；',
        },
        {
          text: '发牌视讯仅保留三日，若有异议请于游戏当日起三日内提出，三日后恕不受理；',
        },
        {
          text: '本娱乐场之视讯为真人直播，故该局游戏若因国际线路传输问题出现争议，将以视讯看到牌局结果决定输赢；',
        },
        {
          text: '本娱乐场所提供之牌路仅供参考，若因国际线路问题或其他因素造成牌路显示有误，所有游戏结果将以视讯开牌及游戏记录为主；',
        },
        {
          text: '本公司保留一切有争议事项的修正及最后的决策；',
        },
        {
          text: '本娱乐场保留随时更改、修订或删除游戏、游戏规则（包括机率及赔率）及协议条款的权利而无须作事先通知；',
        },
        {
          text: '本娱乐场保留随时修订、撤销或中止任何投注的权利而无须作事先通知，亦无须作任何解释；',
        },
        {
          text: '本娱乐场记录每一项于本网站伺服器内执行的交易及投注功能；若会员认为向本娱乐场提供的资料与本网站资料库中的资料记录之间出现了任何声称的差异，一切均以本网站资料库的资料为准；',
        },
        {
          text: '当会员已于本娱乐场之游戏厅内下注，而电脑出现连线异常导致牌局中断时，会员最后押住仍视为有效，本娱乐场将以会员于本网站资料库的交易记录为准；',
        },
        {
          text: '会员在本娱乐场之游戏厅内任何游戏的押注记录均视为有效，会员需自行承担下注后的风险；若经本公司发现会员以不正当手法<利用外挂程式>进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注事情发生，本公司保留取消该类注单之权利。'
        },
      ]
    },
    {
      title: '三、彩票类游戏',
      content: [
        {
          text: '当您在下注之后，请等待显示“下注成功”资讯；',
        },
        {
          text: '为了避免出现争论，您必须在下注之后检查“下注状况”；',
        },
        {
          text: '任何的投诉必须在开彩之前提出，本公司不会受理任何开彩之后的投诉；',
        },
        {
          text: '所有投注项目，公布赔率时出现的任何打字错误或非故意人为失误，本公司保留改正错误和按正确赔率结算投注的权力；',
        },
        {
          text: '开彩后的投注，将被视为“无效”；所有赔率将不时浮动，派彩时的赔率将以确认投注时之赔率为准；',
        },
        {
          text: '所有赛果以官方网站公布的结果为依据，若因官网延迟、错误或取消；本公司保留对已下注注单的裁决权；',
        },
        {
          text: '若发生两颗球同时吸起，将依照在结果区之号码球为主；',
        },
        {
          text: '在游戏尚未完成开配之前，若因机器问题而导致有结果产生，该局将一律注销；',
        },
        {
          text: '在下注时间尚未结束之前，若因任何因素导致有结果产生，该局将一律注销；',
        },
        {
          text: '若该局己有结果但与实际结果不符，系统将根据视讯完成该局之正确结果进行手动开牌；'
        },
      ]
    },
    {
      title: '四、电子游艺',
      content: [
        {
          text: '电子游戏中奖画面与派彩结果不符时，本公司将以资料库最终结果为依据；',
        },
        {
          text: '彩池金额是以满注中奖结果显示，玩家中奖系以押注比例分配彩池金额；',
        },
        {
          text: '老虎机游戏过程中如遇断线情况将以资料库最终结果为依据，本公司保留对已下注注单的裁决权；',
        },
        {
          text: '21点游戏补牌中如遇玩家断线，则视玩家为不补牌；游戏结果将视为有效；',
        },
        {
          text: '红狗游戏过程中如遇断线情况将视为玩家不加注进行补牌，完成该局游戏结果。'
        },
      ]
    }
  ];

}

