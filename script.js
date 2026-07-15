// Q&A Database
const qaDatabase = [
    {
        question: "ما هي خطوات توثيق عقد البيع العقاري؟",
        answer: "خطوات توثيق عقد البيع:\n1. كتابة العقد بوضوح يتضمن بيانات الطرفين والعقار\n2. التوقيع من قبل الطرفين بحضور شاهدين\n3. تصديق العقد لدى كاتب العدل\n4. تسجيل العقد في دائرة التسجيل العقاري\n5. الحصول على صك الملكية الجديد",
        category: "عقاري"
    },
    {
        question: "ما حقوق الموظف عند فسخ عقد العمل؟",
        answer: "حقوق الموظف عند الفسخ:\n1. الحصول على كامل المستحقات المالية\n2. شهادة خدمة مفصلة\n3. تعويض نهاية الخدمة حسب القانون\n4. الإجازات غير المستخدمة\n5. التأمينات الاجتماعية والمستحقات الأخرى",
        category: "عمل"
    },
    {
        question: "كيفية الاعتراض على قرار إداري؟",
        answer: "خطوات الاعتراض:\n1. تقديم التماس إعادة نظر للجهة الإدارية نفسها\n2. يجب تقديمه خلال 30 يوم من القرار\n3. إذا رفضت الجهة، يمكن الطعن أمام المحكمة\n4. تقديم دعوى أمام ديوان العدل أو المحكمة الإدارية\n5. يجب إرفاق جميع الوثائق والأدلة",
        category: "إداري"
    },
    {
        question: "ما الفرق بين الطلاق والخلع والفسخ؟",
        answer: "الفروقات الأساسية:\n• الطلاق: تطليق الزوج للزوجة بصيغة معينة\n• الخلع: طلب الزوجة الانفصال وتدفع عوضاً للزوج\n• الفسخ: فسخ العقد من المحكمة بسبب عيب أو ضرر\nكل نوع له أحكام قانونية وشروط مختلفة",
        category: "أحوال"
    },
    {
        question: "ماذا تفعل عند سقوط الدين؟",
        answer: "حالات سقوط الدين:\n1. مرور الوقت المحدد قانوناً (التقادم)\n2. إبراء الدائن للمدين بشكل طوعي\n3. الوفاء الكامل للدين\n4. المقاصة بين ديون متبادلة\n5. الإفلاس أو الحلول القانونية الأخرى",
        category: "مدني"
    }
];

// Initialize QA Section
function initializeQA() {
    const qaList = document.getElementById('qaList');
    qaList.innerHTML = '';
    
    qaDatabase.forEach((item, index) => {
        const qaItem = document.createElement('div');
        qaItem.className = 'qa-item';
        qaItem.innerHTML = `
            <div class="qa-header">
                <h4>${item.question}</h4>
                <span class="qa-toggle"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="qa-content">
                <div class="qa-body">
                    <p>${item.answer}</p>
                    <div class="qa-meta">
                        <span><i class="fas fa-tag"></i> ${item.category}</span>
                    </div>
                </div>
            </div>
        `;
        
        qaList.appendChild(qaItem);
        
        // Add click event
        qaItem.querySelector('.qa-header').addEventListener('click', () => {
            qaItem.classList.toggle('active');
        });
    });
}

// Form Submission
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        description: document.getElementById('description').value,
        timestamp: new Date().toLocaleString('ar-IQ')
    };
    
    console.log('استشارة جديدة:', formData);
    
    // Show success message
    showSuccessMessage(`
        شكراً يا ${formData.fullname}!
        تم استقبال استشارتك بنجاح.
        سيتم الرد عليك على البريد: ${formData.email}
        أو على الهاتف: ${formData.phone}
        في أقل من 24 ساعة
    `);
    
    // Reset form
    this.reset();
    
    // Add to local storage for demo
    const consultations = JSON.parse(localStorage.getItem('consultations') || '[]');
    consultations.push(formData);
    localStorage.setItem('consultations', JSON.stringify(consultations));
});

// Success Message Function
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        font-size: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    successDiv.innerHTML = `
        <strong><i class="fas fa-check-circle"></i> رسالة النجاح</strong><br>
        ${message}
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Animation for elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .news-card, .qa-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ موقع الاستشارات القانونية تم تحميله بنجاح');
    initializeQA();
});