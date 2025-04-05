export default function Todo(){

    return <>
        <div className="row p-3 bg-success text-light">
            <h1>TODO Project with MERN stack</h1>
        </div>
        <div className="row">
            <h3>Add Items</h3>
            <p className="text-success">Item added successfully</p>
            <div className="form-group d-flex gap-2">
                <input placeholder="text" className="form-control" type="text" />
                <input placeholder="description" className="form-control" type="text" />
                <button className="btn btn-dark">Submit</button>

            </div>
        </div>

    </>
}