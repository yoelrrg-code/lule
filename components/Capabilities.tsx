import React from 'react';

export default function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities">
      <div className="lule-container">
        <span className="section-tag" data-aos="fade-up">Capabilities</span>
        <h2 className="capabilities-title" data-aos="fade-up" data-aos-delay="100">
          Connecting message, brand and experience
        </h2>
        <p className="capabilities-description" data-aos="fade-up" data-aos-delay="150">
          We shape clear narratives and visual direction across everything we create, from brand identities and digital products to presentations and marketing materials, bringing the same thinking from concept through implementation.
        </p>

        <div className="capabilities-grid">
          {/* Item 1 */}
          <div className="capability-card" data-aos="fade-up" data-aos-delay="100">
            <div className="capability-icon">
              <svg width="84" height="72" viewBox="0 0 84 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="36" r="36" fill="#CF000F"/>
                <rect x="36.9" y="32.3999" width="46.8" height="5.4" rx="2.7" fill="#D9D9D9"/>
                <circle cx="22.5" cy="24.3001" r="7.2" fill="white"/>
                <path d="M18.45 34.2002H26.55V35.1002C26.55 36.5914 25.3412 37.8002 23.85 37.8002H21.15C19.6588 37.8002 18.45 36.5914 18.45 35.1002V34.2002Z" fill="white"/>
                <path d="M18.45 32.3999H26.55V29.6999C26.55 28.2087 25.3412 26.9999 23.85 26.9999H21.15C19.6588 26.9999 18.45 28.2087 18.45 29.6999V32.3999Z" fill="white"/>
                <rect x="36.9" y="43.2002" width="23.4" height="5.4" rx="2.7" fill="#D9D9D9"/>
                <rect x="36.9" y="21.6001" width="26.1" height="5.4" rx="2.7" fill="#D9D9D9"/>
                <rect x="36.9" y="54" width="14.4" height="5.4" rx="2.7" fill="#D9D9D9"/>
              </svg>
            </div>
            <h3 className="capability-card-title">Narrative &amp; Identity</h3>
            <p className="capability-card-text">
              We define clear messages, narratives and visual identities that give brands, products and ideas clear direction.
            </p>
          </div>

          {/* Item 2 */}
          <div className="capability-card" data-aos="fade-up" data-aos-delay="200">
            <div className="capability-icon">
              <svg width="81" height="72" viewBox="0 0 81 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="72" height="72" fill="#CF000F"/>
                <rect x="41.4" y="47.25" width="10.8" height="7.2" fill="#D2D4D6"/>
                <path d="M36 57.1502C36 55.659 37.2088 54.4502 38.7 54.4502H54.9C56.3912 54.4502 57.6 55.659 57.6 57.1502H36Z" fill="#D2D4D6"/>
                <rect x="23.5108" y="17.819" width="47.2221" height="28.996" rx="3.66043" fill="white" stroke="#D2D4D6" strokeWidth="4.14229"/>
                <rect x="78.1891" y="29.3229" width="25.6822" height="15.7407" rx="3.72806" transform="rotate(90 78.1891 29.3229)" fill="white" stroke="#D2D4D6" strokeWidth="4.14229"/>
              </svg>
            </div>
            <h3 className="capability-card-title">Digital Products</h3>
            <p className="capability-card-text">
              We create websites, online stores and applications where brand, functionality and user experience come together.
            </p>
          </div>

          {/* Item 3 */}
          <div className="capability-card" data-aos="fade-up" data-aos-delay="300">
            <div className="capability-icon">
              <svg width="77" height="72" viewBox="0 0 77 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M36 0L72.0001 72H0L36 0Z" fill="#CF000F"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M73.0848 12.8427C66.4724 14.2974 59.5923 17.9387 52.8104 23.573C50.8277 25.2203 46.3273 29.7181 44.7064 31.6724C42.3602 34.5012 40.2217 37.5498 38.667 40.2821L37.9292 41.5786L42.2587 45.9165C44.6399 48.3022 46.8168 50.4482 47.0961 50.6851L47.6043 51.1159L48.3406 50.7157C49.4388 50.1188 51.7175 48.6808 53.0886 47.7191C55.9908 45.6839 58.3116 43.742 61.0437 41.0633C66.3301 35.8798 70.1932 30.6728 73.0465 24.8853C74.879 21.1681 76.293 16.9007 76.4744 14.5396C76.5281 13.84 76.5083 13.7011 76.3085 13.3779C75.7875 12.5346 75.0454 12.4114 73.0848 12.8427ZM59.9709 26.0248C60.6497 26.2106 61.6325 26.85 62.1282 27.4285C62.3438 27.6802 62.6668 28.1896 62.8459 28.5604C63.1294 29.1472 63.177 29.3692 63.2125 30.272C63.2465 31.1315 63.2154 31.4219 63.0319 31.9659C62.5925 33.2674 61.7829 34.179 60.5364 34.7754C59.7826 35.136 59.7217 35.1475 58.5606 35.1475C57.3871 35.1475 57.3468 35.1396 56.5825 34.7618C55.5731 34.2628 54.8374 33.5289 54.3423 32.5268C54.0111 31.8565 53.9567 31.639 53.9182 30.8346C53.8692 29.8099 53.987 29.1931 54.3825 28.4048C55.4184 26.34 57.6495 25.3898 59.9709 26.0248ZM31.5779 32.4775C26.3147 37.7421 26.1063 37.9652 26.1063 38.3361C26.1063 39.0103 25.6043 38.8992 33.5213 39.9771C34.7761 40.1479 35.9498 40.3141 36.1296 40.3465C36.4447 40.4032 36.4722 40.378 36.8938 39.6437C39.3017 35.4501 42.1978 31.524 45.432 28.0692C45.9252 27.5423 46.3288 27.0872 46.3288 27.0578C46.3288 27.0285 44.2409 27.0044 41.6892 27.0044H37.0494L31.5779 32.4775ZM61.6716 43.0416C61.0153 43.7271 58.8412 45.6348 57.4082 46.7824C55.0212 48.694 51.8697 50.8541 49.6474 52.1018C49.2196 52.3419 48.8349 52.572 48.7925 52.6131C48.6675 52.734 50.0409 62.4852 50.2216 62.7612C50.3384 62.9394 50.4757 63.0001 50.7625 63.0001C51.132 63.0001 51.3603 62.7867 56.6195 57.5261L62.092 52.052V47.3601C62.092 44.7796 62.0778 42.6682 62.0605 42.6682C62.0432 42.6682 61.8682 42.8363 61.6716 43.0416ZM35.9659 45.6882C34.8212 46.4425 33.6241 47.549 32.9878 48.4409C32.4155 49.2432 32.0449 50.0589 31.4035 51.9284C30.2961 55.1558 29.5291 56.512 27.4646 58.8926C26.3299 60.201 26.2736 60.1757 28.4916 59.3546C32.1405 58.0036 35.2673 56.1209 37.7456 53.7824C38.4062 53.1591 38.4555 53.1307 38.3931 53.4118C38.0105 55.1323 37.5186 56.0741 36.4513 57.1289L35.622 57.9485L36.4471 57.8919C38.2333 57.7695 40.0363 56.8589 41.6208 55.2793C42.3959 54.5067 42.641 54.1806 42.9912 53.4566C43.2257 52.9716 43.445 52.3648 43.4786 52.108L43.5397 51.6412L40.2381 48.3449L36.9367 45.0485L35.9659 45.6882Z" fill="#D2D4D6"/>
              </svg>
            </div>
            <h3 className="capability-card-title">Brand Communications</h3>
            <p className="capability-card-text">
              We extend ideas and identities through presentations and branded assets across digital and physical channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
