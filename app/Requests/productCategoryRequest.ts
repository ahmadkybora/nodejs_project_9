const productCategoryRequest = {
    employeeId: {
        type: "string",
        trim: true,
        messages: {
            required: "نام کارمند الزامی است",
        }
    },
    brandId: {
        type: "string",
        trim: true,
        messages: {
            required: "نام برند الزامی است",
        }
    },
    name: {
        type: "string",
        trim: true,
        min: 2,
        max: 255,
        messages: {
            required: "نام الزامی است",
            stringMin: "نام نباید کمتر از 2 کلمه باشد",
            stringMax: "نام نباید بیشتر از 255 کلمه باشد",
        }
    },
    status: {
        type: "string",
        trim: true,
        messages: {
            required: "نام وضعیت الزامی است",
        }
    },
};

export = productCategoryRequest;
