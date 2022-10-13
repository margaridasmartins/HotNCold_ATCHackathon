const data = [
    { "metric": "Cost", "Order Month": "2011-02-01 00:00:00", "Furniture": "0.7735896597604033", "Office-Supplies": "0.5576691145468795", "Technology": "1.5033405036462606" },
    { "metric": "Cost", "Order Month": "2011-03-01 00:00:00", "Furniture": "0.5530029054562966", "Office-Supplies": "0.7485473664269193", "Technology": "0.9102953901617419" },
    { "metric": "Cost", "Order Month": "2011-04-01 00:00:00", "Furniture": "0.006283635465533035", "Office-Supplies": "0.8410982739367479", "Technology": "0.5895793683884352" },
    { "metric": "Cost", "Order Month": "2011-05-01 00:00:00", "Furniture": "0.5445991807613348", "Office-Supplies": "0.7430376497561306", "Technology": "0.6784338045514724" },
    { "metric": "Cost", "Order Month": "2011-06-01 00:00:00", "Furniture": "0.6258518359777552", "Office-Supplies": "0.7917201095094983", "Technology": "0.5531832573664437" },
    { "metric": "Cost", "Order Month": "2011-07-01 00:00:00", "Furniture": "0.5957739553664274", "Office-Supplies": "0.9117611462009347", "Technology": "0.6446096481782215" },
    { "metric": "Cost", "Order Month": "2011-08-01 00:00:00", "Furniture": "0.5984749054716585", "Office-Supplies": "0.7535971633610465", "Technology": "0.5198525110900314" },
    { "metric": "Cost", "Order Month": "2011-09-01 00:00:00", "Furniture": "0.6864336777949813", "Office-Supplies": "0.8272848499591208", "Technology": "0.8181442958009517" },
    { "metric": "Cost", "Order Month": "2011-10-01 00:00:00", "Furniture": "0.6072426076995601", "Office-Supplies": "0.693573334315317", "Technology": "0.6735986172114161" },
    { "metric": "Cost", "Order Month": "2011-11-01 00:00:00", "Furniture": "0.6454301849717319", "Office-Supplies": "0.7963112043764793", "Technology": "0.647045749182924" },
    { "metric": "Cost", "Order Month": "2011-12-01 00:00:00", "Furniture": "0.6833851004069575", "Office-Supplies": "0.7628965598046231", "Technology": "0.6272490206305601" },
    { "metric": "Cost", "Order Month": "2012-01-01 00:00:00", "Furniture": "0.7524522985464639", "Office-Supplies": "0.6393258867482863", "Technology": "0.7324858973123947" },
    { "metric": "Cost", "Order Month": "2012-02-01 00:00:00", "Furniture": "0.5955930581651434", "Office-Supplies": "0.8246541478232836", "Technology": "0.5713918273723599" },
    { "metric": "Cost", "Order Month": "2012-03-01 00:00:00", "Furniture": "0.6593082389274929", "Office-Supplies": "0.8262474596300065", "Technology": "0.689996623274451" },
    { "metric": "Cost", "Order Month": "2012-04-01 00:00:00", "Furniture": "0.617388611773642", "Office-Supplies": "0.8034859549170046", "Technology": "0.5785074932327066" },
    { "metric": "Cost", "Order Month": "2012-05-01 00:00:00", "Furniture": "0.6855386343061631", "Office-Supplies": "0.6961003000599093", "Technology": "0.6350406573707956" },
    { "metric": "Cost", "Order Month": "2012-06-01 00:00:00", "Furniture": "0.6689403184537182", "Office-Supplies": "0.7937916269805148", "Technology": "0.571504929701445" },
    { "metric": "Cost", "Order Month": "2012-07-01 00:00:00", "Furniture": "0.5793108731503156", "Office-Supplies": "0.6644353272925232", "Technology": "0.5152962236038217" },
    { "metric": "Cost", "Order Month": "2012-08-01 00:00:00", "Furniture": "0.6117244519244602", "Office-Supplies": "0.007804007193012577", "Technology": "0.6469355180034402" },
    { "metric": "Cost", "Order Month": "2012-09-01 00:00:00", "Furniture": "0.747567521101494", "Office-Supplies": "0.7618110922344139", "Technology": "0.5614949949695218" },
    { "metric": "Cost", "Order Month": "2012-10-01 00:00:00", "Furniture": "0.6111662994177849", "Office-Supplies": "0.7975939730301251", "Technology": "0.5384977642359665" },
    { "metric": "Cost", "Order Month": "2012-11-01 00:00:00", "Furniture": "0.6380376581960248", "Office-Supplies": "0.744553974081922", "Technology": "0.6434208828603107" },
    { "metric": "Cost", "Order Month": "2012-12-01 00:00:00", "Furniture": "0.6614738589206555", "Office-Supplies": "0.7405827399532199", "Technology": "0.6833526547963846" },
    { "metric": "Cost", "Order Month": "2013-01-01 00:00:00", "Furniture": "0.6572079098707195", "Office-Supplies": "0.7683661019235544", "Technology": "0.597034899248577" },
    { "metric": "Cost", "Order Month": "2013-02-01 00:00:00", "Furniture": "0.6092901536022766", "Office-Supplies": "0.67468021188993", "Technology": "0.8525628657741262" },
    { "metric": "Cost", "Order Month": "2013-03-01 00:00:00", "Furniture": "0.5898722302257595", "Office-Supplies": "0.8681708976392337", "Technology": "0.7162411256231775" },
    { "metric": "Cost", "Order Month": "2013-04-01 00:00:00", "Furniture": "0.632313147892307", "Office-Supplies": "0.7945519368569791", "Technology": "0.8341497101062791" },
    { "metric": "Cost", "Order Month": "2013-05-01 00:00:00", "Furniture": "0.7089760834244969", "Office-Supplies": "0.7671960878670427", "Technology": "0.7199198017752204" },
    { "metric": "Cost", "Order Month": "2013-06-01 00:00:00", "Furniture": "0.6140289575866922", "Office-Supplies": "0.7018504640773522", "Technology": "0.7401072209488981" },
    { "metric": "Cost", "Order Month": "2013-07-01 00:00:00", "Furniture": "0.6261492768527188", "Office-Supplies": "0.7827686593567282", "Technology": "0.6373608669363735" },
    { "metric": "Cost", "Order Month": "2013-08-01 00:00:00", "Furniture": "0.597430829334366", "Office-Supplies": "0.7477402193514302", "Technology": "0.577543648632304" },
    { "metric": "Cost", "Order Month": "2013-09-01 00:00:00", "Furniture": "0.6109187507418261", "Office-Supplies": "0.7906755875298999", "Technology": "0.6478303312865763" },
    { "metric": "Cost", "Order Month": "2013-10-01 00:00:00", "Furniture": "0.6125648844744702", "Office-Supplies": "0.7825530625043315", "Technology": "0.7992523193185832" },
    { "metric": "Cost", "Order Month": "2013-11-01 00:00:00", "Furniture": "0.6611182718366524", "Office-Supplies": "0.7385401915981673", "Technology": "0.7268500938264588" },
    { "metric": "Cost", "Order Month": "2013-12-01 00:00:00", "Furniture": "0.5925635474859461", "Office-Supplies": "0.8062018527977535", "Technology": "0.6104276546311223" },
    { "metric": "Cost", "Order Month": "2014-01-01 00:00:00", "Furniture": "0.6324014626069228", "Office-Supplies": "0.8544715088579422", "Technology": "0.6795102795009915" },
    { "metric": "Cost", "Order Month": "2014-02-01 00:00:00", "Furniture": "0.6031341014307863", "Office-Supplies": "0.7683427078046521", "Technology": "0.6284568830543864" },
    { "metric": "Cost", "Order Month": "2014-03-01 00:00:00", "Furniture": "0.6411569617894899", "Office-Supplies": "0.732675984705929", "Technology": "0.7039112796263505" },
    { "metric": "Cost", "Order Month": "2014-04-01 00:00:00", "Furniture": "0.5984644927504845", "Office-Supplies": "0.7721839982637473", "Technology": "0.796688797243946" },
    { "metric": "Cost", "Order Month": "2014-05-01 00:00:00", "Furniture": "0.6507249772744859", "Office-Supplies": "0.7183582487651525", "Technology": "0.6512411766388349" },
    { "metric": "Cost", "Order Month": "2014-06-01 00:00:00", "Furniture": "0.5743421264157598", "Office-Supplies": "0.7598577698750744", "Technology": "0.6187213250865218" },
    { "metric": "Cost", "Order Month": "2014-07-01 00:00:00", "Furniture": "0.6019222918600577", "Office-Supplies": "0.6910876361103222", "Technology": "0.6213584830682723" },
    { "metric": "Cost", "Order Month": "2014-08-01 00:00:00", "Furniture": "0.7501038272687035", "Office-Supplies": "0.8116237278525016", "Technology": "0.7024782881881877" },
    { "metric": "Cost", "Order Month": "2014-09-01 00:00:00", "Furniture": "0.6337433839523121", "Office-Supplies": "0.80067674839068", "Technology": "0.6258859347248127" },
    { "metric": "Cost", "Order Month": "2014-10-01 00:00:00", "Furniture": "0.6604221573125393", "Office-Supplies": "0.8118930380564746", "Technology": "0.7712798735097712" },
    { "metric": "Cost", "Order Month": "2014-11-01 00:00:00", "Furniture": "0.6452477526512921", "Office-Supplies": "0.7761031440689949", "Technology": "0.7507379782671" },
    { "metric": "Cost", "Order Month": "2014-12-01 00:00:00", "Furniture": "0.6265558881005657", "Office-Supplies": "0.792166394177839", "Technology": "0.00595675862209669" },
    { "metric": "Quantity", "Order Month": "2011-01-01 00:00:00", "Furniture": "0.30555555555555536", "Office-Supplies": "0.3412228796844181", "Technology": "0.4419753086419753" },
    { "metric": "Quantity", "Order Month": "2011-02-01 00:00:00", "Furniture": "0.4099999999999999", "Office-Supplies": "0.3444928021426179", "Technology": "0.43722943722943697" },
    { "metric": "Quantity", "Order Month": "2011-03-01 00:00:00", "Furniture": "0.32538167938931295", "Office-Supplies": "0.30923423423423424", "Technology": "0.3582766439909295" },
    { "metric": "Quantity", "Order Month": "2011-04-01 00:00:00", "Furniture": "0.3055555555555556", "Office-Supplies": "0.34884057971014504", "Technology": "0.3694545454545455" },
    { "metric": "Quantity", "Order Month": "2011-05-01 00:00:00", "Furniture": "0.3913043478260869", "Office-Supplies": "0.34289978188497283", "Technology": "0.3522727272727273" },
    { "metric": "Quantity", "Order Month": "2011-06-01 00:00:00", "Furniture": "0.33182589033352183", "Office-Supplies": "0.3492780511414053", "Technology": "0.29220779220779214" },
    { "metric": "Quantity", "Order Month": "2011-07-01 00:00:00", "Furniture": "0.35307017543859653", "Office-Supplies": "0.34193452711971206", "Technology": "0.44543689320388347" },
    { "metric": "Quantity", "Order Month": "2011-08-01 00:00:00", "Furniture": "0.366043613707165", "Office-Supplies": "0.3532349109856707", "Technology": "0.44510582010582" },
    { "metric": "Quantity", "Order Month": "2011-09-01 00:00:00", "Furniture": "0.3663273001508296", "Office-Supplies": "0.3473016285516286", "Technology": "0.34662236987818384" },
    { "metric": "Quantity", "Order Month": "2011-10-01 00:00:00", "Furniture": "0.3292307692307692", "Office-Supplies": "0.3209320799682247", "Technology": "0.3261261261261261" },
    { "metric": "Quantity", "Order Month": "2011-11-01 00:00:00", "Furniture": "0.2912578055307762", "Office-Supplies": "0.337249303784138", "Technology": "0.336888888888889" },
    { "metric": "Quantity", "Order Month": "2011-12-01 00:00:00", "Furniture": "0.36293363499245856", "Office-Supplies": "0.34760066750742014", "Technology": "0.29765299407764867" },
    { "metric": "Quantity", "Order Month": "2012-01-01 00:00:00", "Furniture": "0.42727272727272725", "Office-Supplies": "0.29147727272727275", "Technology": "0.3875598086124401" },
    { "metric": "Quantity", "Order Month": "2012-02-01 00:00:00", "Furniture": "0.4444444444444444", "Office-Supplies": "0.3498452012383899", "Technology": "0.38156028368794326" },
    { "metric": "Quantity", "Order Month": "2012-03-01 00:00:00", "Furniture": "0.35897435897435903", "Office-Supplies": "0.3699204021784668", "Technology": "0.33080808080808066" },
    { "metric": "Quantity", "Order Month": "2012-04-01 00:00:00", "Furniture": "0.3795598432318359", "Office-Supplies": "0.348829595678507", "Technology": "0.33574879227053134" },
    { "metric": "Quantity", "Order Month": "2012-05-01 00:00:00", "Furniture": "0.30612244897959173", "Office-Supplies": "0.3069981583793737", "Technology": "0.29501915708812243" },
    { "metric": "Quantity", "Order Month": "2012-06-01 00:00:00", "Furniture": "0.3185714285714287", "Office-Supplies": "0.3308277027027027", "Technology": "0.26331360946745574" },
    { "metric": "Quantity", "Order Month": "2012-07-01 00:00:00", "Furniture": "0.3557504873294346", "Office-Supplies": "0.3156509019990248", "Technology": "0.3784313725490196" },
    { "metric": "Quantity", "Order Month": "2012-08-01 00:00:00", "Furniture": "0.3353794642857142", "Office-Supplies": "0.3822124450031428", "Technology": "0.30200222469410454" },
    { "metric": "Quantity", "Order Month": "2012-09-01 00:00:00", "Furniture": "0.3261324041811846", "Office-Supplies": "0.37555184240612083", "Technology": "0.3766825879287885" },
    { "metric": "Quantity", "Order Month": "2012-10-01 00:00:00", "Furniture": "0.3331932773109245", "Office-Supplies": "0.36157190053903676", "Technology": "0.3529411764705883" },
    { "metric": "Quantity", "Order Month": "2012-11-01 00:00:00", "Furniture": "0.3447405329593267", "Office-Supplies": "0.29733595565885906", "Technology": "0.3143212508884148" },
    { "metric": "Quantity", "Order Month": "2012-12-01 00:00:00", "Furniture": "0.34872743509600057", "Office-Supplies": "0.33796146808739636", "Technology": "0.3414758269720102" },
    { "metric": "Quantity", "Order Month": "2013-01-01 00:00:00", "Furniture": "0.38883888388838894", "Office-Supplies": "0.35626535626535616", "Technology": "0.3257575757575757" },
    { "metric": "Quantity", "Order Month": "2013-02-01 00:00:00", "Furniture": "0.2890922959572846", "Office-Supplies": "0.3482280431432976", "Technology": "0.3459119496855345" },
    { "metric": "Quantity", "Order Month": "2013-03-01 00:00:00", "Furniture": "0.33434547908232104", "Office-Supplies": "0.33010204081632666", "Technology": "0.3008484848484849" },
    { "metric": "Quantity", "Order Month": "2013-04-01 00:00:00", "Furniture": "0.25650874946649593", "Office-Supplies": "0.30781398291679873", "Technology": "0.38477801268498957" },
    { "metric": "Quantity", "Order Month": "2013-05-01 00:00:00", "Furniture": "0.30672210672210665", "Office-Supplies": "0.3291025878574516", "Technology": "0.35687606112054326" },
    { "metric": "Quantity", "Order Month": "2013-06-01 00:00:00", "Furniture": "0.276867418599702", "Office-Supplies": "0.33840471672539985", "Technology": "0.3535353535353536" },
    { "metric": "Quantity", "Order Month": "2013-07-01 00:00:00", "Furniture": "0.3344645550527905", "Office-Supplies": "0.34523646801530883", "Technology": "0.37841796875" },
    { "metric": "Quantity", "Order Month": "2013-08-01 00:00:00", "Furniture": "0.33386666666666653", "Office-Supplies": "0.345123595505618", "Technology": "0.3338345864661654" },
    { "metric": "Quantity", "Order Month": "2013-09-01 00:00:00", "Furniture": "0.3351493428912786", "Office-Supplies": "0.362408580598208", "Technology": "0.3405797101449275" },
    { "metric": "Quantity", "Order Month": "2013-10-01 00:00:00", "Furniture": "0.3553332467195012", "Office-Supplies": "0.3474683268753538", "Technology": "0.32893553223388294" },
    { "metric": "Quantity", "Order Month": "2013-11-01 00:00:00", "Furniture": "0.34587612323491657", "Office-Supplies": "0.3688776973036314", "Technology": "0.2933061962912711" },
    { "metric": "Quantity", "Order Month": "2013-12-01 00:00:00", "Furniture": "0.33130097394884794", "Office-Supplies": "0.3599544847113616", "Technology": "0.32062915910465817" },
    { "metric": "Quantity", "Order Month": "2014-01-01 00:00:00", "Furniture": "0.3536821705426356", "Office-Supplies": "0.33854053663122885", "Technology": "0.3098400650582813" },
    { "metric": "Quantity", "Order Month": "2014-02-01 00:00:00", "Furniture": "0.37239436619718314", "Office-Supplies": "0.28783727687837257", "Technology": "0.4013605442176871" },
    { "metric": "Quantity", "Order Month": "2014-03-01 00:00:00", "Furniture": "0.3699248120300753", "Office-Supplies": "0.36522694866920147", "Technology": "0.33501501501501507" },
    { "metric": "Quantity", "Order Month": "2014-04-01 00:00:00", "Furniture": "0.32520325203252054", "Office-Supplies": "0.33057141790766265", "Technology": "0.3704481792717087" },
    { "metric": "Quantity", "Order Month": "2014-05-01 00:00:00", "Furniture": "0.3794230769230771", "Office-Supplies": "0.349431553443295", "Technology": "0.36030378267854535" },
    { "metric": "Quantity", "Order Month": "2014-06-01 00:00:00", "Furniture": "0.32267441860465107", "Office-Supplies": "0.33350840336134446", "Technology": "0.3547237076648839" },
    { "metric": "Quantity", "Order Month": "2014-07-01 00:00:00", "Furniture": "0.31905864197530853", "Office-Supplies": "0.3045725496114089", "Technology": "0.3264248704663213" },
    { "metric": "Quantity", "Order Month": "2014-08-01 00:00:00", "Furniture": "0.32672882672882664", "Office-Supplies": "0.3445878080815885", "Technology": "0.39269776876267737" },
    { "metric": "Quantity", "Order Month": "2014-09-01 00:00:00", "Furniture": "0.33642754145638065", "Office-Supplies": "0.33206300813008127", "Technology": "0.30619018215498617" },
    { "metric": "Quantity", "Order Month": "2014-10-01 00:00:00", "Furniture": "0.3916603678508439", "Office-Supplies": "0.35694575843582466", "Technology": "0.3991534939967176" },
    { "metric": "Quantity", "Order Month": "2014-11-01 00:00:00", "Furniture": "0.3160196409390823", "Office-Supplies": "0.36021225986623917", "Technology": "0.3431843137254902" },
    { "metric": "Quantity", "Order Month": "2014-12-01 00:00:00", "Furniture": "0.357560855667568", "Office-Supplies": "0.35173602636075185", "Technology": "0.3141836734693877" },
    { "metric": "Sales", "Order Month": "2011-01-01 00:00:00", "Furniture": "0.7522652072981642", "Office-Supplies": "0.7695639081056866", "Technology": "0.525145804413705" },
    { "metric": "Sales", "Order Month": "2011-02-01 00:00:00", "Furniture": "0.7774779798753615", "Office-Supplies": "0.5598731737288509", "Technology": "0.5351190143140454" },
    { "metric": "Sales", "Order Month": "2011-03-01 00:00:00", "Furniture": "0.5375733045646633", "Office-Supplies": "0.7171018836851724", "Technology": "0.8872198978785102" },
    { "metric": "Sales", "Order Month": "2011-04-01 00:00:00", "Furniture": "0.6141840082223629", "Office-Supplies": "0.8018041744949429", "Technology": "0.5598729021381696" },
    { "metric": "Sales", "Order Month": "2011-05-01 00:00:00", "Furniture": "0.5501148561480278", "Office-Supplies": "0.7433633853049468", "Technology": "0.6679356467328732" },
    { "metric": "Sales", "Order Month": "2011-06-01 00:00:00", "Furniture": "0.6404314310959893", "Office-Supplies": "0.7922027069038693", "Technology": "0.5721082768835577" },
    { "metric": "Sales", "Order Month": "2011-07-01 00:00:00", "Furniture": "0.5916996186414796", "Office-Supplies": "0.8783220735692612", "Technology": "0.6301871807743349" },
    { "metric": "Sales", "Order Month": "2011-08-01 00:00:00", "Furniture": "0.6145742326996861", "Office-Supplies": "0.7458950903596926", "Technology": "0.5050920627543976" },
    { "metric": "Sales", "Order Month": "2011-09-01 00:00:00", "Furniture": "0.6818882579798087", "Office-Supplies": "0.8369524602668041", "Technology": "0.7816257114960048" },
    { "metric": "Sales", "Order Month": "2011-10-01 00:00:00", "Furniture": "0.6097639186426171", "Office-Supplies": "0.6672828348166799", "Technology": "0.6846107843585649" },
    { "metric": "Sales", "Order Month": "2011-11-01 00:00:00", "Furniture": "0.6299487687253889", "Office-Supplies": "0.7695244368908383", "Technology": "0.6607522208039904" },
    { "metric": "Sales", "Order Month": "2011-12-01 00:00:00", "Furniture": "0.6996313398352494", "Office-Supplies": "0.7372096985714169", "Technology": "0.6633899265551659" },
    { "metric": "Sales", "Order Month": "2012-01-01 00:00:00", "Furniture": "0.7211308876244042", "Office-Supplies": "0.6204034625548713", "Technology": "0.7217066078519707" },
    { "metric": "Sales", "Order Month": "2012-02-01 00:00:00", "Furniture": "0.6206676094851475", "Office-Supplies": "0.8374301793172119", "Technology": "0.5938177919052701" },
    { "metric": "Sales", "Order Month": "2012-03-01 00:00:00", "Furniture": "0.6665921456845327", "Office-Supplies": "0.8479552813187781", "Technology": "0.7193377017934446" },
    { "metric": "Sales", "Order Month": "2012-04-01 00:00:00", "Furniture": "0.6136591535345872", "Office-Supplies": "0.8037496335362633", "Technology": "0.5858287397387285" },
    { "metric": "Sales", "Order Month": "2012-05-01 00:00:00", "Furniture": "0.7094594183266811", "Office-Supplies": "0.6824420388935755", "Technology": "0.6492976200701013" },
    { "metric": "Sales", "Order Month": "2012-06-01 00:00:00", "Furniture": "0.6266238364445522", "Office-Supplies": "0.7949093080442278", "Technology": "0.5897224804307946" },
    { "metric": "Sales", "Order Month": "2012-07-01 00:00:00", "Furniture": "0.5646487998836709", "Office-Supplies": "0.6623656909851714", "Technology": "0.5177975127871408" },
    { "metric": "Sales", "Order Month": "2012-08-01 00:00:00", "Furniture": "0.6201462530492781", "Office-Supplies": "0.7636378427995323", "Technology": "0.6733287067349987" },
    { "metric": "Sales", "Order Month": "2012-09-01 00:00:00", "Furniture": "0.7201897482991801", "Office-Supplies": "0.7223473802862885", "Technology": "0.561835705786641" },
    { "metric": "Sales", "Order Month": "2012-10-01 00:00:00", "Furniture": "0.590123614446878", "Office-Supplies": "0.7619429047948321", "Technology": "0.5511211004276324" },
    { "metric": "Sales", "Order Month": "2012-11-01 00:00:00", "Furniture": "0.6464745449359619", "Office-Supplies": "0.7264312602791416", "Technology": "0.6823364420091342" },
    { "metric": "Sales", "Order Month": "2012-12-01 00:00:00", "Furniture": "0.6511813630211036", "Office-Supplies": "0.6878594377407026", "Technology": "0.6834472009283332" },
    { "metric": "Sales", "Order Month": "2013-01-01 00:00:00", "Furniture": "0.6631805995200515", "Office-Supplies": "0.7629406306402398", "Technology": "0.5939715104607475" },
    { "metric": "Sales", "Order Month": "2013-02-01 00:00:00", "Furniture": "0.6112473865385224", "Office-Supplies": "0.6486319671608678", "Technology": "0.8695696970656075" },
    { "metric": "Sales", "Order Month": "2013-03-01 00:00:00", "Furniture": "0.5957331599738223", "Office-Supplies": "0.8416073172037974", "Technology": "0.7405242322907672" },
    { "metric": "Sales", "Order Month": "2013-04-01 00:00:00", "Furniture": "0.6260942433173569", "Office-Supplies": "0.7215914311309997", "Technology": "0.8477686388335601" },
    { "metric": "Sales", "Order Month": "2013-05-01 00:00:00", "Furniture": "0.7175148166973964", "Office-Supplies": "0.7621913997980754", "Technology": "0.7271425796166859" },
    { "metric": "Sales", "Order Month": "2013-06-01 00:00:00", "Furniture": "0.6306911805603692", "Office-Supplies": "0.6702110943619264", "Technology": "0.7190691476286468" },
    { "metric": "Sales", "Order Month": "2013-07-01 00:00:00", "Furniture": "0.6276414909304071", "Office-Supplies": "0.7398643596152783", "Technology": "0.6629907656056868" },
    { "metric": "Sales", "Order Month": "2013-08-01 00:00:00", "Furniture": "0.5919207611568711", "Office-Supplies": "0.7364967015630477", "Technology": "0.5539836606243795" },
    { "metric": "Sales", "Order Month": "2013-09-01 00:00:00", "Furniture": "0.6020236482213743", "Office-Supplies": "0.7660831391311564", "Technology": "0.6518956061910957" },
    { "metric": "Sales", "Order Month": "2013-10-01 00:00:00", "Furniture": "0.589126048283251", "Office-Supplies": "0.7903524683843552", "Technology": "0.8498322925178059" },
    { "metric": "Sales", "Order Month": "2013-11-01 00:00:00", "Furniture": "0.6606363899032519", "Office-Supplies": "0.7244289380444013", "Technology": "0.6551638158161446" },
    { "metric": "Sales", "Order Month": "2013-12-01 00:00:00", "Furniture": "0.5868539993014559", "Office-Supplies": "0.8177254397825533", "Technology": "0.6148797957434102" },
    { "metric": "Sales", "Order Month": "2014-01-01 00:00:00", "Furniture": "0.6060216477711722", "Office-Supplies": "0.8549179531045237", "Technology": "0.6962572757690324" },
    { "metric": "Sales", "Order Month": "2014-02-01 00:00:00", "Furniture": "0.6010756127422456", "Office-Supplies": "0.7531247973347133", "Technology": "0.6305381830078596" },
    { "metric": "Sales", "Order Month": "2014-03-01 00:00:00", "Furniture": "0.6537659856273261", "Office-Supplies": "0.697858861929574", "Technology": "0.7531252835336011" },
    { "metric": "Sales", "Order Month": "2014-04-01 00:00:00", "Furniture": "0.575889848119929", "Office-Supplies": "0.7902234205060674", "Technology": "0.7488603427718206" },
    { "metric": "Sales", "Order Month": "2014-05-01 00:00:00", "Furniture": "0.6454390665664127", "Office-Supplies": "0.714673382861073", "Technology": "0.6621491345892592" },
    { "metric": "Sales", "Order Month": "2014-06-01 00:00:00", "Furniture": "0.580475140727774", "Office-Supplies": "0.7562924357488909", "Technology": "0.6462431963940227" },
    { "metric": "Sales", "Order Month": "2014-07-01 00:00:00", "Furniture": "0.5684585220970577", "Office-Supplies": "0.6865434544052571", "Technology": "0.6076236842756726" },
    { "metric": "Sales", "Order Month": "2014-08-01 00:00:00", "Furniture": "0.7246999247795265", "Office-Supplies": "0.7939992814960151", "Technology": "0.6860321260541293" },
    { "metric": "Sales", "Order Month": "2014-09-01 00:00:00", "Furniture": "0.6426244183555783", "Office-Supplies": "0.7724519383124895", "Technology": "0.6086466118449132" },
    { "metric": "Sales", "Order Month": "2014-10-01 00:00:00", "Furniture": "0.6292719613010673", "Office-Supplies": "0.8033463246477612", "Technology": "0.7995391448490718" },
    { "metric": "Sales", "Order Month": "2014-11-01 00:00:00", "Furniture": "0.6372120534441854", "Office-Supplies": "0.7491178165423342", "Technology": "0.7371111538231812" },
    { "metric": "Sales", "Order Month": "2014-12-01 00:00:00", "Furniture": "0.6198492908595687", "Office-Supplies": "0.7436327438088823", "Technology": "0.6219558096338558" }
]
export default data