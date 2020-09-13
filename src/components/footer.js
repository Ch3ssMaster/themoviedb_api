import React from 'react';

const Footer = () => {
    return (<footer className="pt-4 m-5 pt-md-5 border-top">
        <div className="row justify-content-md-center text-center">
            <div className="col-sm text-success mb-3">
                <h5>
                    Antonio Cebrián
    <small className="mb-3" id="date"> © </small>
    2020
        </h5>
                <h6 className="text-primary">TheMovieDB API <br />
                    <span className="text-dark">v1.0.0-alpha</span>
                </h6>
            </div>
            <div className="col-sm-auto mb-3">
                <h5>My personal Website</h5>
                <div className="hover-container my-3">
                    <a className="cig" href="http://clasesinformaticagranada.es/">
                        <span>Clases Informática Granada</span>
                    </a>
                </div>
            </div>
            <div className="col-sm mb-3">
                <h5>Follow my work</h5>
                <ul className="list-group list-group-horizontal-lg">
                    <li className="list-group-item flex-fill">
                        <a className="btn-floating btn-lg btn-li" type="button" role="button"
                            href="https://www.linkedin.com/in/antonio-cebrián-mesa">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </li>
                    <li className="list-group-item flex-fill">
                        <a className="btn-floating btn-lg btn-git" type="button" role="button" href="https://github.com/Ch3ssMaster">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li className="list-group-item flex-fill">
                        <a className="btn-floating btn-lg btn-tw" type="button" role="button"
                            href="https://twitter.com/hacking_the_web">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>)
}

export default Footer;