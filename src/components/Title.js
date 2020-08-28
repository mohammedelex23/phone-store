import React from 'react'

export default function Title({ name, title }) {
    return (
        <div className="container-fluid mb-3">
            <div className="row">
                <div className="col-10 text-center text-title mx-auto my-2">
                    <h1 className="text-capitalize font-weight-bold">
                        {name} <strong className="text-blue">{title}</strong>
                    </h1>
                </div>
            </div>
        </div>
    )
}
