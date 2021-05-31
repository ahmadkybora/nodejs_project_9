const articleRequest = {
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

export = articleRequest;
