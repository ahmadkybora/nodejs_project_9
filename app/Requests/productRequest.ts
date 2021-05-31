const productRequest = {
    category_id: {
        type: "string",
        trim: true,
        min: 2,
        max: 255,
        messages: {
            required: "نام خانوادگی الزامی است",
            stringMin: "نام خانوادگی نباید کمتر از 2 کلمه باشد",
            stringMax: "نام خانوادگی نباید بیشتر از 255 کلمه باشد",
        }
    },
    name: {
        type: "string",
        trim: true,
        min: 2,
        max: 255,
        message: {
            required: "نام الزامی است",
            stringMin: "نام نباید کمتر از 2 کلمه باشد",
            stringMax: "نام نباید بیشتر از 255 کلمه باشد",
        }
    },
};

export = productRequest;
