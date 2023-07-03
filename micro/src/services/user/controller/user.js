const user = require("../model/user");
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const nodemailer = require("nodemailer");
// const jwt = require('jsonwebtoken');
const fs = require('fs');

const test = async (req, res) => {
    return res.send('user controller works');
}

const Register = async (req, res) => {

    const { email, name, role, password } = req.body;

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (existingUser) {
        return res.status(200).json({ success: false, message: 'user already exist!!', data: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new user({
        email,
        name,
        role,
        avatar: 'avatar.png',
        password: hashedPassword
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }
    const payload = { id: NewUser._id };

    return res.status(201).json({ success: true, message: 'user added successfully', data: NewUser });

}

const Login = async (req, res) => {

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error ', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'Email donst exist!!', data: null });
    }

    const compare = await bcrypt.compare(password, existingUser.password);  // true// false

    if (!compare) {
        return res.status(200).json({ success: false, message: 'Check Your Password', data: null });
    }
    const payload = { id: existingUser };

    return res.status(200).json({ success: true, message: `Logged Successfully, Welcome Mr/Miss/Mrs ${existingUser.name}`, data: existingUser });

}

const GetAll = async (req, res) => {

    let allUser;
    try {
        allUser = await user.find();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error when find', data: error });
    }

    return res.status(200).json({ success: true, message: 'all users', data: allUser });

}

const GetRequestPdv = async (req, res) => {

    const { active } = req.body;

    let allUser;
    try {
        allUser = await user.find({ active: active, role: 'pdv' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error when find', data: error });
    }

    return res.status(200).json({ success: true, message: 'all users', data: allUser });

}

const GetAllPdv = async (req, res) => {

    let allUser;
    try {
        allUser = await user.find({ role: 'pdv' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error when find', data: error });
    }

    return res.status(200).json({ success: true, message: 'all users', data: allUser });

}

const GetAllAdmins = async (req, res) => {

    // const { active } = req.body;

    let allUser;
    try {
        allUser = await user.find({ role: 'admin' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error when find', data: error });
    }

    return res.status(200).json({ success: true, message: 'all users', data: allUser });

}

const GetAllFinance = async (req, res) => {

   

    let allUser;
    try {
        allUser = await user.find({ role: 'finance' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error when find', data: error });
    }

    return res.status(200).json({ success: true, message: 'all users', data: allUser });

}

const FindById = async (req, res) => {

    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    return res.status(200).json({ success: true, message: 'user found successfully', data: existingUser });

}

const Add = async (req, res) => {

    const { email, name, role } = req.body;

    let avatar = 'avatar.png';
    if (req.file) {
        avatar = req.file.filename;
    }

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (existingUser) {
        return res.status(200).json({ success: false, message: 'user already exist!!', data: null });
    }

    let password = generator.generate({
        length: 8,
        numbers: true
    });
    // let password = 'secret';

    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new user({
        email,
        name,
        role,
        avatar,
        password: hashedPassword,
        active: true
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    var transporter = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        service: "gmail",
        // port: 2525,
        auth: {
            user: "sebntn.contact@gmail.com",
            pass: "joucivcesyymsnjd"
        }
    });

    let info = await transporter.sendMail({
        from: 'sebntn.contact@gmail.com', // sender address
        to: email, // list of receivers
        subject: "New Account Created", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 20px;">
            <h1 style="text-align: center; color: #3d3d3d; margin-bottom: 40px;">Welcome to Our App!</h1>
            <p style="font-size: 18px; color: #3d3d3d;">Dear ${name},</p>
            <p style="font-size: 18px; color: #3d3d3d;">Your new account has been successfully created in our App as a(n) <strong>${role}</strong>.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Please keep your password in a safe place. You can change your password anytime by logging into your account.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Here is your password: <strong>${password}</strong></p>
            <div style="text-align: center; margin-top: 40px;">
                <a href="https://www.google.com/" style="display: inline-block; background-color: #0066ff; color: white; font-size: 18px; padding: 12px 30px; text-decoration: none; border-radius: 30px;">Check out our App</a>
            </div>
            <p style="font-size: 16px; color: #666; margin-top: 40px;">Thank you for using our App!</p>
        </div>
    </div>
        `, // html body
    });

    return res.status(201).json({ success: true, message: 'user added successfully', data: NewUser });

}

const Update = async (req, res) => {

    const { email, name, role } = req.body;
    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    if (req.body.password) {

        existingUser.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file && existingUser.avatar) {
        let path = `./uploads/images/${existingUser.avatar}`;
        if (existingUser.avatar !== 'avatar.png' && fs.existsSync(path)) {

            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
        existingUser.avatar = req.file.filename;

    }

    existingUser.email = email;
    existingUser.name = name;
    existingUser.role = role;

    try {
        await existingUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'user updated successfully', data: existingUser });

}

const DeleteUser = async (req, res) => {
    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }



    try {
        await existingUser.deleteOne();
    } catch (error) {
        return res.status(400).json({ success: false, message: 'internal server error', data: error });
    }

    if (existingUser.avatar) {
        let path = `./uploads/images/${existingUser.avatar}`;
        if (existingUser.avatar !== 'avatar.png' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
    }
    if (existingUser.cin) {
        let path = `./uploads/images/${existingUser.cin}`;
        if (existingUser.cin !== 'cin.png' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
    }
    if (existingUser.patent) {
        let path = `./uploads/images/${existingUser.patent}`;
        if (existingUser.patent !== 'patent.png' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
    }

    return res.status(200).json({ success: true, message: 'user deleted successfully', data: null });
}

const Add_PDV = async (req, res) => {
    // console.log(req.body);
    const { email, name, role, tel, ville, adress, register_comm, shop_name, secter, active } = req.body;



    let avatar = 'avatar.png';
    let cin = 'cin.png';
    let patent = 'patente.png';

    if (req.files) {
        // console.log(req.files);
        const avatarFiles = req.files.avatar;
        const cinFiles = req.files.cin;
        const patentFiles = req.files.patent;

        if (avatarFiles && avatarFiles.length > 0) {
            avatar = avatarFiles[0].filename;
        }

        if (cinFiles && cinFiles.length > 0) {
            cin = cinFiles[0].filename;
        }

        if (patentFiles && patentFiles.length > 0) {
            patent = patentFiles[0].filename;
        }
    }


    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (existingUser) {
        return res.status(200).json({ success: false, message: 'user already exist!!', data: null });
    }


    let password = generator.generate({
        length: 8,
        numbers: true
    });


    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new user({
        email,
        name,
        role,
        avatar,
        password: hashedPassword,
        tel,
        ville,
        adress,
        register_comm,
        shop_name,
        secter,
        cin,
        patent,
        active
    });

    try {
        await NewUser.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    // const smsAPIUrl = "https://www.winsmspro.com/sms/sms/api";
    // const apiKey = "eUVFc2k9RT1JcGpmQVBJb2FzeWE=";
    // const senderName = "KHALLASLI";

    // // Convert `tel` to a string and check if it starts with "216"
    // const telString = String(tel);
    // const recipientNumber = telString.startsWith("216")
    //     ? telString
    //     : `216${telString}`;
    // const message = `Mr(s) ${name}, your Request to become a PDV has been successfully submitted. Here is your password: ${password}. Please keep your it in a safe place, You can change your password anytime by logging into your account.`;

    // const url = `${smsAPIUrl}?action=send-sms&api_key=${apiKey}&to=${recipientNumber}&from=
    //     ${senderName}&sms=${encodeURIComponent(message)}`;

    // axios.get(url)
    //     .then(() => {
    //         console.log("SMS sent successfully");
    //     })
    //     .catch((error) => {
    //         console.error("Failed to send SMS:", error);
    //     });

    var transporter = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        service: "gmail",
        // port: 2525,
        auth: {
            user: "sebntn.contact@gmail.com",
            pass: "joucivcesyymsnjd"
        }
    });

    let info = await transporter.sendMail({
        from: 'sebntn.contact@gmail.com', // sender address
        to: email, // list of receivers
        subject: "New Account Created", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 20px;">
            <h1 style="text-align: center; color: #3d3d3d; margin-bottom: 40px;">Welcome to Our App!</h1>
            <p style="font-size: 18px; color: #3d3d3d;">Dear ${name},</p>
            <p style="font-size: 18px; color: #3d3d3d;">Your new account has been successfully created in our App as a(n) <strong>${role}</strong>.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Please keep your password in a safe place. You can change your password anytime by logging into your account.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Here is your password: <strong>${password}</strong></p>
            <div style="text-align: center; margin-top: 40px;">
                <a href="https://www.google.com/" style="display: inline-block; background-color: #0066ff; color: white; font-size: 18px; padding: 12px 30px; text-decoration: none; border-radius: 30px;">Check out our App</a>
            </div>
            <p style="font-size: 16px; color: #666; margin-top: 40px;">Thank you for using our App!</p>
        </div>
    </div>
        `, // html body
    });

    return res.status(201).json({ success: true, message: 'user added successfully', data: NewUser });

}

const Add_Finance = async (req, res) => {

    const { email, name, tel, adress, matricule, role } = req.body;

    let avatar = 'avatar.png';
    if (req.file) {
        avatar = req.file.filename;
    }

    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (existingUser) {
        return res.status(200).json({ success: false, message: 'user already exist!!', data: null });
    }

    let password = generator.generate({
        length: 8,
        numbers: true
    });
    // let password = 'secret';

    const hashedPassword = await bcrypt.hash(password, 10);

    const NewUser = new user({
        email,
        name,
        role,
        avatar,
        tel,
        adress,
        matricule,
        password: hashedPassword,
        active: true
    });

    try {
        await NewUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    var transporter = nodemailer.createTransport({
        // host: "smtp.mailtrap.io",
        service: "gmail",
        // port: 2525,
        auth: {
            user: "sebntn.contact@gmail.com",
            pass: "joucivcesyymsnjd"
        }
    });

    let info = await transporter.sendMail({
        from: 'sebntn.contact@gmail.com', // sender address
        to: email, // list of receivers
        subject: "New Account Created", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; padding: 20px;">
            <h1 style="text-align: center; color: #3d3d3d; margin-bottom: 40px;">Welcome to Our App!</h1>
            <p style="font-size: 18px; color: #3d3d3d;">Dear ${name},</p>
            <p style="font-size: 18px; color: #3d3d3d;">Your new account has been successfully created in our App as a(n) <strong>${role}</strong>.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Please keep your password in a safe place. You can change your password anytime by logging into your account.</p>
            <p style="font-size: 18px; color: #3d3d3d;">Here is your password: <strong>${password}</strong></p>
            <div style="text-align: center; margin-top: 40px;">
                <a href="https://www.google.com/" style="display: inline-block; background-color: #0066ff; color: white; font-size: 18px; padding: 12px 30px; text-decoration: none; border-radius: 30px;">Check out our App</a>
            </div>
            <p style="font-size: 16px; color: #666; margin-top: 40px;">Thank you for using our App!</p>
        </div>
    </div>
        `, // html body
    });

    return res.status(201).json({ success: true, message: 'user added successfully', data: NewUser });

}

const Update_Finance = async (req, res) => {

    const { email,
        name,
        tel,
        adress,
        matricule,
    } = req.body;
    const { id } = req.params;

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    if (req.body.password) {

        existingUser.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file && existingUser.avatar) {
        let path = `./uploads/images/${existingUser.avatar}`;
        if (existingUser.avatar !== 'avatar.png' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error })
            }
        }
        existingUser.avatar = req.file.filename;

    }
    if (req.body.role) {
        existingUser.role = req.body.role;
    }

    existingUser.name = name;
    existingUser.email = email;
    existingUser.tel = tel;
    existingUser.adress = adress;
    existingUser.matricule = matricule;

    try {
        await existingUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'user updated successfully', data: existingUser });

}

const Update_PDV = async (req, res) => {

    const { email, name, role, tel, ville, adress, register_comm, shop_name, secter, newPass, confirmPass } = req.body;
    const { id } = req.params;
    console.log(req.body);
    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }
    
    if (newPass) {
        if ( confirmPass !== newPass) {
            return res.status(200).json({ success: false, message: 'Confirm password doesnt match the password!!', data: null });
        }
        existingUser.password = await bcrypt.hash(newPass, 10);
    }

    if (req.files && req.files.avatar && existingUser.avatar) {
        let path = `./uploads/images/${existingUser.avatar}`;
        if (existingUser.avatar !== 'avatar.png' && fs.existsSync(path)) {

            try {
                fs.unlinkSync(path);
                // File removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error });
            }
        }
        existingUser.avatar = req.files.avatar[0].filename;
    }

    if (req.files && req.files.cin && existingUser.cin) {
        let path = `./uploads/images/${existingUser.cin}`;
        if (existingUser.cin !== 'cin.png' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path);
                // File removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error });
            }
        }
        existingUser.cin = req.files.cin[0].filename;
    }

    if (req.files && req.files.patent && existingUser.patent) {
        let path = `./uploads/images/${existingUser.patent}`;
        if (existingUser.patent !== 'patente.png' && fs.existsSync(path)) {
            try {
                fs.unlinkSync(path);
                // File removed
            } catch (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: error, error: error });
            }
        }
        existingUser.patent = req.files.patent[0].filename;
    }
    // existingUser.active = true;
    if (email) {
        existingUser.email = email;
    }
    if (name) {
        existingUser.name = name;
    }
    if (role) {
        existingUser.role = role;
    }
    if (tel) {
        existingUser.tel = tel;
    }
    if (ville) {
        existingUser.ville = ville;
    }
    if (adress) {
        existingUser.adress = adress;
    }
    if (register_comm) {
        existingUser.register_comm = register_comm;
    }
    if (shop_name) {
        existingUser.shop_name = shop_name;
    }
    if (secter) {
        existingUser.secter = secter;
    }

    try {
        await existingUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'user updated successfully', data: existingUser });

}

const Lock = async (req, res) => {

    const { lock } = req.body;
    const { id } = req.params;

    // if (lock === false) {
    // let existingUser;
    // try {
    //     existingUser = await user.findById(id);
    // } catch (error) {
    //     return res.status(500).json({ success: false, message: 'internal error server', data: error });
    // }

    // if (!existingUser) {
    //     return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    // }



    // try {
    //     await existingUser.deleteOne();
    // } catch (error) {
    //     return res.status(400).json({ success: false, message: 'internal server error', data: error });
    // }

    // if (existingUser.avatar) {
    //     let path = `./uploads/images/${existingUser.avatar}`;
    //     if (fs.existsSync(path)) {
    //         try {
    //             fs.unlinkSync(path)
    //             //file removed
    //         } catch (error) {
    //             console.log(error);
    //             return res.status(500).json({ success: false, message: error, error: error })
    //         }
    //     }
    // }
    // if (existingUser.cin) {
    //     let path = `./uploads/images/${existingUser.cin}`;
    //     try {
    //         fs.unlinkSync(path)
    //         //file removed
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ success: false, message: error, error: error })
    //     }
    // }
    // if (existingUser.patent) {
    //     let path = `./uploads/images/${existingUser.patent}`;
    //     try {
    //         fs.unlinkSync(path)
    //         //file removed
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ success: false, message: error, error: error })
    //     }
    // }
    // return res.status(200).json({ success: true, message: 'user updated successfully', data: existingUser });
    // }

    let existingUser;
    try {
        existingUser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internalm error server', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'user donst exist!!', data: null });
    }

    existingUser.active = lock;

    try {
        await existingUser.save();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error', data: error });
    }

    return res.status(200).json({ success: true, message: 'user updated successfully', data: existingUser });

}

exports.test = test
exports.Register = Register
exports.GetAllAdmins = GetAllAdmins
// exports.GetAllFinance = GetAllAdmins
exports.GetAllFinance = GetAllFinance
exports.GetAllPdv = GetAllPdv
exports.GetRequestPdv = GetRequestPdv
exports.FindById = FindById
exports.DeleteUser = DeleteUser
exports.Login = Login
exports.Update = Update
exports.Update_PDV = Update_PDV
exports.Add = Add
exports.Add_PDV = Add_PDV
exports.Lock = Lock
exports.GetAll = GetAll
exports.Add_Finance = Add_Finance
exports.Update_Finance = Update_Finance