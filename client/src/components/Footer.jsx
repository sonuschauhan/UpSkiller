import React from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h3>SkillForge</h3>
          <p>Empowering your learning journey through quality online courses.</p>
        </div>

        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Follow Us</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.copyRight}>
        &copy; {new Date().getFullYear()} SkillForge. All rights reserved.
      </div>
    </footer>
  );
}
