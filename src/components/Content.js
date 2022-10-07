import "./Content_style.css"

function Content(){
    return(
        <div className="dashboard_container">
            <section className="dashboard_section">
                <table className="dashboard_table">
                    <thead>
                        <tr>
                            <th className="board_no">No</th>
                            <th className="board_title">제목</th>
                            <th className="board_writer">작성자</th>
                            <th className="board_create_date">등록일</th>
                            <th className="board_views">조회수</th>
                            <th className="board_filecheck">파일 유무</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>테스트 제목</td>
                            <td>테스트 작성자</td>
                            <td>2022-10-07</td>
                            <td>100</td>
                            <td>FILE</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>테스트 제목</td>
                            <td>테스트 작성자</td>
                            <td>2022-10-07</td>
                            <td>100</td>
                            <td>FILE</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>테스트 제목</td>
                            <td>테스트 작성자</td>
                            <td>2022-10-07</td>
                            <td>100</td>
                            <td>FILE</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Content;