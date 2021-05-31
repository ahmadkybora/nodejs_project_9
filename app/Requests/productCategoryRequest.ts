/*const productCategoryRequestValidation = {
    employeeId: {
        type: "number",
        integer: true,
        trim: true,
        messages: {
            required: "نام کارمند الزامی است",
        }
    },
    brandId: {
        type: "number",
        integer: true,
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
        message: {
            required: "نام الزامی است",
            stringMin: "نام نباید کمتر از 2 کلمه باشد",
            stringMax: "نام نباید بیشتر از 255 کلمه باشد",
        }
    },
};

module.exports = productCategoryRequestValidation;*/

const Yup = require("yup");

const productCategoryRequest = Yup.object().shape({
    employeeId: Yup.number()
        .required("نام کارمند است"),

    brandId: Yup.number()
        .required("نام برند الزامی است"),

    name: Yup.string()
        .required("نام الزامی است"),
});

/*const productCategoryRequestValidation = (req, res, next) => {
    Yup.object().shape({
        employeeId: Yup.number()
            .required("نام کارمند است"),

        brandId: Yup.number()
            .required("نام برند الزامی است"),

        name: Yup.string()
            .required("نام الزامی است"),
    });
}*/

//console.log(productCategoryRequestValidation);
export = productCategoryRequest;
