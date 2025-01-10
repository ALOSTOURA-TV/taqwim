// دالة لعرض المستخدمين في الجدول
function loadUsers() {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = ""; // مسح البيانات القديمة

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        userTableBody.innerHTML = "<tr><td colspan='6'>لا يوجد مستخدمين لعرضهم</td></tr>";
    } else {
        // عرض البيانات في الجدول
        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${user.profileImage}" alt="الصورة الشخصية" width="50" height="50"></td>
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
}

// التعامل مع إضافة مستخدم جديد
document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newJobCode = document.getElementById('newJobCode').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPhone = document.getElementById('newPhone').value;
    const newProfileImage = document.getElementById('newProfileImage').files[0];

    if (!newProfileImage) {
        alert("يرجى تحميل صورة شخصية!");
        return;
    }

    // تحويل الصورة إلى base64
    const reader = new FileReader();
    reader.onloadend = function() {
        const newUser = {
            username: newUsername,
            jobCode: newJobCode,
            email: newEmail,
            phone: newPhone,
            profileImage: reader.result  // الصورة المحولة إلى base64
        };

        // الحصول على قائمة المستخدمين من localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // إضافة المستخدم الجديد إلى القائمة
        users.push(newUser);

        // حفظ القائمة مرة أخرى في localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('تم إضافة المستخدم بنجاح!');
        loadUsers();  // تحديث قائمة المستخدمين في الصفحة
    };

    reader.readAsDataURL(newProfileImage);  // تحويل الصورة إلى base64
});

    

// دالة لعرض التوست (Toast notification)
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(function () { toast.className = toast.className.replace("show", ""); }, 3000);
}

// عند تحميل الصفحة
window.onload = function() {
    loadUsers();  // تحميل بيانات المستخدمين
    updateDashboard(); // تحديث لوحة التحكم
};

// دالة لتعديل بيانات المستخدم
function editUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    // ملء نموذج التعديل
    document.getElementById('username').value = user.username;
    document.getElementById('jobCode').value = user.jobCode;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;

    // تغيير منطق إرسال النموذج لتحديث المستخدم
    document.getElementById('signupForm').onsubmit = function (e) {
        e.preventDefault();

        // تحديث البيانات بالمعلومات المدخلة
        user.username = document.getElementById('username').value;
        user.jobCode = document.getElementById('jobCode').value;
        user.email = document.getElementById('email').value;
        user.phone = document.getElementById('phone').value;

        // حفظ التغييرات في localStorage
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));

        alert('تم تعديل البيانات بنجاح!');
        loadUsers(); // إعادة تحميل البيانات
    };
}

// دالة لحذف المستخدم
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const confirmDelete = confirm("هل أنت متأكد من حذف هذا المستخدم؟");
    if (confirmDelete) {
        users.splice(index, 1); // إزالة المستخدم
        localStorage.setItem('users', JSON.stringify(users));  // حفظ التغييرات في localStorage
        loadUsers();  // إعادة تحميل البيانات
        showToast("تم حذف المستخدم بنجاح");
    }
}

// دالة لحظر المستخدم
function blockUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];
    user.blocked = true;
    localStorage.setItem('users', JSON.stringify(users)); // حفظ التغييرات
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
  const profileImage = document.getElementById('profileImage').files[0];

  if (!profileImage) {
    alert("يرجى تحميل صورة شخصية!");
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
    localStorage.setItem('users', JSON.stringify(users));

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

// التعامل مع استعادة كلمة المرور باستخدام الكود الوظيفي
document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const forgotJobCode = document.getElementById('forgotJobCode').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(u => u.jobCode === forgotJobCode);

  if (user) {
    alert(`تم إرسال كلمة المرور إلى بريدك الإلكتروني: ${user.email}`);
  } else {
    alert('الكود الوظيفي غير صحيح!');
  }
});