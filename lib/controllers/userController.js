const models = require("../../models");
const { getInstanceById } = require("../services/modelService");
const { hashPassword, verifyPassword } = require("../services/passwordService");
const { getToken, verifyToken } = require("../services/tokenService");
const { userTransformer, usersTransformer } = require("../transformers/userTransformer");

const store = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const [user, created] = await models.User.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      name: req.body.name,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
   
    },
  });
  if (created) {
    httpResponse.data = userTransformer(user)
    httpResponse.messages.push("User created successfully");
  } else {
    res.status(409);
    httpResponse.success = false;
    httpResponse.messages.push("You are already registered");
  }
  return res.send(httpResponse);
};

const login = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const { email = "", password = "" } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (user) {
    if (verifyPassword(password, user.password)) {
      httpResponse.data = userTransformer(user);
      httpResponse.messages.push("logged in successfully");
      httpResponse.token = getToken({
        id: user.id,
        type: "user",
      });
    } else {
      httpResponse.success = false;
      httpResponse.messages.push("Invalid password!");
      res.status(401);
    }
  } else {
    httpResponse.success = false;
    httpResponse.messages.push("Account not found you should register first!");
    res.status(401);
  }
  return res.send(httpResponse);
};

const index = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const users = await models.User.findAll();
  httpResponse.data = usersTransformer(users);
  return res.send(httpResponse);
};

const update = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "User");
  if (item.success) {
    await item.instance.update({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      phone: req.body.phone,
    });
    httpResponse.data = userTransformer(item.instance);
    httpResponse.messages.push("User updated successfully");
  } else {
    httpResponse.messages = [...item.messages];
    res.status(item.status);
  }
  return res.send(httpResponse);
};

const destroy = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "User");
  if (item.success) {
    await item.instance.destroy();
    httpResponse.messages.push("User deleted successfully");
  } else {
    res.status(item.status);
    httpResponse.success = false;
    httpResponse.messages = [...item.messages];
  }
  return res.send(httpResponse);
};

const show = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "User");
  if (item.success) {
    httpResponse.data = userTransformer( item.instance.dataValues);
  }
  httpResponse.success = false;
  httpResponse.messages = [...item.messages];
  res.status(item.status);
  return res.send(httpResponse);
};
const like = async (req, res) => {
  const user = await models.User.findByPk(req.user.id)
  const company = await getInstanceById(req.body.companyId, 'Company')
  if (company.success) {
    if (await user.hasFavorite(company.instance.id)) {
      return res.send({
        success: false,
        messages: ['You already added this company to favorite']
      })
    }
    const favAdded = await user.addFavorite(req.body.companyId)
    if (favAdded) {
      return res.send({
        success: true,
        messages: ['Company has been added to the favorite list']
      })
    } else {
      return res.send({
        success: false,
        messages: ['Could not add the company, please try again later']
      })
    }
  }
  return res.send({
    success: false,
    messages: ['The company you are trying to add is invalid']
  })
}
const view = async (req, res) => {
  const user = await models.User.findByPk(req.user.id)
  const company = await getInstanceById(req.body.companyId, 'Company')
  if (company.success) {
    const viewAdded = await user.addView(String(req.body.companyId))
    if (viewAdded) {
      return res.send({
        success: true,
        messages: ['Company has been added to the views list']
      })
    } else {
      return res.send({
        success: false,
        messages: ['Could not add the company, please try again later']
      })
    }
  }
  return res.send({
    success: false,
    messages: [req.t('errors.invalidCompanyId')]
  })
}
module.exports = {
  store,
  login,
  index,
  update,
  destroy,
  show,
  like,
  view
};