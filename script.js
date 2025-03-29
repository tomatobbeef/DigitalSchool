const signInBtn = document.getElementById("signIn");
const signUpBtn = document.getElementById("signUp");
const firstForm = document.getElementById("form1");
const secondForm = document.getElementById("form2");
const container = document.querySelector(".container");
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;

signInBtn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signUpBtn.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

firstForm.addEventListener("submit", (e) => {
    e.preventDefault(); // 阻止表单的默认提交行为
  console.log("进行注册")
  var formData = new FormData(firstForm);
  var username = formData.get("username");
  var password = formData.get("password");
  // 存储数据
  console.log("username", username);
  console.log("password", password);
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  container.classList.add("right-panel-active");
});
secondForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 阻止表单的默认提交行为

  // 使用 FormData 对象获取所有表单数据
  var formData = new FormData(secondForm);
  var username = formData.get("username");
  var password = formData.get("password");
  // 读取数据
  let user = localStorage.getItem("username");
  let pass = localStorage.getItem("password");
  console.log("user:",user)
  console.log("pass:",pass)
  if (username === "dida2024" && password === "12345678") {
    window.location.href = "index.html";
  }
  else if(username === user && password === pass){
    window.location.href = "index.html";
  } 
  else {
    alert("密码错误");
  }
  console.log("用户名:", username);
  console.log("密码:", password);
});
