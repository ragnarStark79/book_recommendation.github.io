
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}

// contact us


function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var password = document.forms["myForm"]["password"].value;
  var cpassword = document.forms["myForm"]["cpassword"].value;

  var atpos = email.indexOf("@");
  var dotpos = email.lastIndexOf(".");

  if (name == "" || email == "" || password == "" || cpassword == "") {
      alert("Please fill in all fields.");
      return false;
  }

  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length) {
      alert("Please enter a valid e-mail address.");
      return false;
  }

  if (password != cpassword) {
      alert("Passwords do not match.");
      return false;
  }

  if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return false;
  }

  return true;
}



// smooth scrolling
//  $(document).ready(function() {
//         // Add smooth scrolling to all links with a hash
//         $('a[href*="#"]:not([href="#"])').on('click', function() {
//             if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
//                 location.hostname == this.hostname) {
//                 var target = $(this.hash);
//                 target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//                 if (target.length) {
//                     $('html, body').animate({
//                         scrollTop: target.offset().top
//                     }, 1000); // Adjust the speed of scrolling as needed
//                     return false;
//                 }
//             }
//         });
//     });