// * Html'de bulunan id'lere queryselcetor ile ulaşmak
const form = document.querySelector("#form")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const repassword = document.querySelector("#repassword")

// bilgi girilmediğinde verilecek hata 
function error(input, message) {
    input.className = 'form-control is-invalid'
    const div = input.nextElementSibling
    div.innerText = message
    div.className = 'invalid-feedback'
}

// bilgi girildiğinde verilecek onay
function success(input) {
    input.className = 'form-control is-valid'
}

// email kontrolu regex
function checkEmail(input){
    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if(re.test(input.value)) {
      success(input)
  }else {
      error(input, 'Hatalı bir mail adresi girdiniz')
  }
}

// formda gelen alanları kontrol etmek
function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if(input.value === '') {
            error(input, `${input.id} Gerekli`)
        }else {
            success(input)
        }
    });
    
}

// Girilen değerlerin uzunluk kontolleri
function checkLength(input, min, max){
    if(input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır `)
    }else if (input.value.length > max){
        error(input, `${input.id} en fazla ${max} karakter olmalıdır.`)
    }else {
        success(input)
    }
}

// parola bilgilerini birbiri ile karşılaştırma
function checkPasswords(input1, input2){
    if(input1.value !== input2.value){
        error(input2, 'Parolalar eşleşmiyor')
    }
}

// Telefon kontolü
function checkPhone(input){
    let exp = /^\d{10}$/
    if(!exp.test(input.value)){
        error(input, 'Telefon 10 haneli olmalıdır')
    }
}

// ulaştığımız forma event eklemek
form.addEventListener('submit', function(e){
    e.preventDefault()

    // kontroller
    checkRequired([username, email, password, repassword, phone])
    checkEmail(email)
    checkPasswords(password, repassword)
    checkPhone(phone)
    checkLength(username, 7, 15)
    checkLength(password, 7, 12)
})