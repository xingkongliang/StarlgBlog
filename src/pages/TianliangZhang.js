import React from 'react';
import Layout from '@theme/Layout';
import "@site/static/TianliangZhang_files/tlzdoc.css";

export default function TianliangZhang() {
  return (
    <Layout title="Tianliang Zhang">
      <div id="layout-content" style={{ marginTop: '25px' }}>
        <table>
          <tbody>
            <tr>
              <td width="670">
                <div id="toptitle">
                  <h1>Tianliang Zhang</h1>
                </div>
                <h3>Researcher in Computer Vision</h3>
                <h3>3i Lab in <a href="http://www.3irobotix.com/">3irobotix</a></h3>
                <p>
                  <br /> Email:
                  <a href="mailto:tianliangjay@gmail.com"> tianliangjay@gmail.com</a>
                  <br /> LinkedIn:
                  <a href="https://www.linkedin.com/in/zhangtianliang/">www.linkedin.com/in/zhangtianliang</a>
                  <br /><br />
                </p>
              </td>
              <td>
                <img
                  width="200"
                  src="/TianliangZhang_files/TianliangZhang.jpg"
                  alt="Tianliang Zhang"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Biography</h2>
        <p>
          I am an engineer at <a href="http://www.3irobotix.com/">3irobotix</a>, actively involved in research
          within the realms of computer vision and robotics. In 2020, I attained my Ph.D. in Signal and Information
          Processing from the <a href="https://eece.ucas.ac.cn/index.php/en/">School of Electronic, Electrical and Communication Engineering</a>
          at <a href="http://english.ucas.ac.cn/">University of Chinese Academy of Sciences</a>, under
          <a href="http://people.ucas.ac.cn/~0007279?language=en">Prof. Qixiang Ye</a>.
        </p>

        <h2>News</h2>
        <ul>
          <li>May 2022: One paper HDNet accepted by IEEE ICME 2022</li>
          <li>Nov 2021: Winner of LVIS Challenge Workshop (ICCV 2021) and "most innovative" award</li>
          <li>Dec 2020: One paper FC-Net accepted by IEEE ITS 2020</li>
          <li>Jul 2020: Pollyanna Chu Outstanding Doctoral Scholarship</li>
          <li>Feb 2020: One paper accepted by CVPR 2020</li>
        </ul>

        <h2>Publications</h2>
        <table className="pub_table">
          <tbody>
            <tr>
              <td className="pub_td1">
                <img
                  src="/TianliangZhang_files/PaperFig/Global_Meets_Local_ACMMM2022.png"
                  className="papericon"
                  alt="Paper preview"
                  style={{ width: '120px' }}
                />
              </td>
              <td className="pub_td2">
                <b>Global Meets Local: Effective Multi-Label Image Classification via Category-Aware Weak Supervision</b>
                <br />Proceedings of the 30th ACM International Conference on Multimedia, 2022
                <br />[<a href="https://dl.acm.org/doi/abs/10.1145/3503161.3547834">PDF</a>]
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Awards</h2>
        <ul>
          <li>2022/01 Tencent Outstanding Staff Award</li>
          <li>
            <a href="https://www.lvisdataset.org/challenge_2021">
              2021/11 Winner of LVIS Challenge Workshop (ICCV 2021) and "most innovative" award
            </a>
          </li>
          <li>2021/04 Tencent Youtu Lab AI Star</li>
          <li>
            <a href="https://onestop.ucas.edu.cn/home/infob/293a1b1b-9a77-447b-b7e6-cee7de090923/1">
              2020/07 Pollyanna Chu Outstanding Doctoral Scholarship (PhD)
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
