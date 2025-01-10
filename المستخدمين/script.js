// دالة لحفظ بيانات المستخدمين في localStorage
function saveUsers(users) {
    try {
        localStorage.setItem('users', JSON.stringify(users));
        console.log("تم حفظ البيانات في localStorage");
    } catch (error) {
        console.error("حدث خطأ أثناء حفظ البيانات:", error);
    }
}

// دالة لتحميل المستخدمين من GitHub
function loadUsers() {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = ""; // مسح البيانات القديمة

    fetch('https://raw.githubusercontent.com/ALOSTOURA-TV/taqwim/refs/heads/main/%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D8%AE%D8%AF%D9%85%D9%8A%D9%86/users.json')
        .then(response => response.json())
        .then(users => {
            console.log("تم تحميل البيانات من GitHub:", users);

            if (users.length === 0) {
                userTableBody.innerHTML = "<tr><td colspan='6'>لا يوجد مستخدمين لعرضهم</td></tr>";
            } else {
                // عرض البيانات في الجدول
                users.forEach((user, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td><img src="${user.profileImage || 'path/to/default/image'}" alt="صورة المستخدم" width="50" height="50"></td>
                        <td>${user.username}</td>
                        <td>${user.jobCode}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button class="edit" onclick="editUser(${index})">تعديل</button>
                            <button class="delete" onclick="deleteUser(${index})">حذف</button>
                            <button class="block" onclick="blockUser(${index})">حظر</button>
                        </td>
                    `;
                    userTableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching data from GitHub:', error));
}

// دالة لحذف المستخدم
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const confirmDelete = confirm("هل أنت متأكد من حذف هذا المستخدم؟");
    if (confirmDelete) {
        users.splice(index, 1); // إزالة المستخدم
        saveUsers(users);  // حفظ التغييرات في localStorage
        loadUsers();  // إعادة تحميل البيانات
        showToast("تم حذف المستخدم بنجاح");
    }
}

// دالة لإضافة مستخدم جديد
document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newJobCode = document.getElementById('newJobCode').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPhone = document.getElementById('newPhone').value;

    const newUser = {
        username: newUsername,
        jobCode: newJobCode,
        email: newEmail,
        phone: newPhone,
        profileImage: 'path/to/default/image'  // يمكنك إضافة صورة افتراضية أو إضافة منطق لاختيار صورة
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    saveUsers(users);  // حفظ التغييرات في localStorage

    alert('تم إضافة المستخدم الجديد بنجاح!');
    loadUsers(); // إعادة تحميل المستخدمين بعد إضافة مستخدم جديد
});

// دالة لتعديل بيانات المستخدم
function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    // منطق التعديل هنا (مثال لتعديل الاسم)
    const newUsername = prompt("أدخل اسم المستخدم الجديد:", user.username);
    if (newUsername) {
        user.username = newUsername;
        saveUsers(users);  // حفظ التغييرات في localStorage
        loadUsers();  // إعادة تحميل البيانات من GitHub
        showToast("تم تعديل البيانات بنجاح");
    }
}

// دالة لحظر المستخدم
function blockUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];
    user.blocked = true;
    saveUsers(users); // حفظ التغييرات في localStorage
    showToast(`تم حظر المستخدم: ${user.username}`);
}

// دالة لعرض التوست (Toast notification)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}

// دالة لتسجيل الخروج
document.getElementById('logoutBtn').addEventListener('click', function () {
    alert('تم تسجيل الخروج');
    window.location.href = 'login.html'; // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
});

// عند تحميل الصفحة
window.onload = function() {
    loadUsers();  // تحميل بيانات المستخدمين
    updateDashboard(); // تحديث لوحة التحكم
};

// تحديث الإحصائيات في لوحة التحكم
function updateDashboard() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    document.getElementById("userCount").textContent = users.length;  // عدد المستخدمين
    document.getElementById("lastActivity").textContent = "لا يوجد نشاط بعد";  // يمكنك تعديل هذا بناءً على النشاطات الحقيقية
}

// التعامل مع تسجيل حساب جديد
document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const jobCode = document.getElementById('jobCode').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const profileImage = document.getElementById('profileImage').files[0];  // تحميل الصورة

  if (!profileImage) {
    alert("يرجى تحميل صورة شخصية!");
    return;
  }

  // التحقق من حجم الصورة (أقصى حجم: 2 ميجابايت)
  if (profileImage.size > 2000000) {
    alert("حجم الصورة كبير جدًا! يجب أن يكون أقل من 2 ميجابايت.");
    return;
  }

  // تحويل الصورة إلى base64
  const reader = new FileReader();
  reader.onloadend = function() {
    const newUser = {
      username,
      jobCode,
      email,
      phone,
      password,
      profileImage: reader.result  // الصورة المحولة إلى base64
    };

    // الحصول على قائمة المستخدمين من localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // إضافة المستخدم الجديد إلى القائمة
    users.push(newUser);

    // حفظ القائمة مرة أخرى في localStorage
    saveUsers(users);

    alert('تم التسجيل بنجاح!');
    window.location.href = 'login.html'; // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  };

  reader.readAsDataURL(profileImage);  // تحويل الصورة إلى base64
});

// التعامل مع تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const loginUsername = document.getElementById('loginUsername').value;
  const loginJobCode = document.getElementById('loginJobCode').value;
  const loginPassword = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];

  // البحث عن المستخدم الذي يمتلك اسم المستخدم والكود الوظيفي الصحيحين
  const user = users.find(u => u.username === loginUsername && u.jobCode === loginJobCode && u.password === loginPassword);

  if (user) {
    alert('تم تسجيل الدخول بنجاح!');
    window.location.href = 'dashboard.html'; // بعد تسجيل الدخول يتم توجيه المستخدم إلى لوحة التحكم
  } else {
    alert('إسم المستخدم أو الكود الوظيفي أو كلمة المرور غير صحيحة!');
  }
});
