'use strict';


module.exports.getAll = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: [
                {
                    title: "Task 1",
                    done: true
                },
                {
                    title: "Task 2",
                    done: false
                }
            ]
        })
    }
}


module.exports.getById = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: {
                title: "Task 1",
                done: true
            }
        })
    }
}