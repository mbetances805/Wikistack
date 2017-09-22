var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');


// const Page = sequelize.define('project', {
//   title: Sequelize.STRING,
//   urlTitle: Sequelize.STRING,
//   content: Sequelize.TEXT,
//   status: Sequelize.ENUM('open', 'closed')
// })
//
// const User = sequelize.define('task', {
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// })


var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING, allowNull: false, validate: {isURL: true},
        getterMethods: {
          wikiUrl() {
            const url = this.getDataValue('urlTitle');
            return '/wiki/' + url
          }
        }
    },
    content: {
        type: Sequelize.TEXT, allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'), defaultValue: 'open'
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false
    },
    email: {
        type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}
    }
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};

db.sync();
