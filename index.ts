import express, { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const app = express();
const port = 3000;

app.use(express.json());

const prisma = new PrismaClient({rejectOnNotFound: true});

//Hello World表示
app.get('/', (req: Request, res: Response) =>
res.send('Hololive 1st generation & Hololive GAMERS Shirakami Fubuki'));

//ユーザ情報の取得
app.get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.json(users);
});

//ユーザ情報の登録
app.post('/users', async(req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });
        return res.json(user);
    } catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                console.log('There is a unique constraint violation, a new user cannot be created with this email');
            }
        }
        return res.status(400).json(e);
    }
});

//ユーザ情報の更新
app.put('/users/:id', async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { email } = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
            },
        });
        return res.json(user);
    } catch(e) {
        return res.status(400).json(e);
    }
});

//ユーザ情報の削除
app.delete('/users/:id', async(req: Request, res: Response) => {
    const id = Number(req.params.id);

    try{
        const user = await prisma.user.delete({
            where: {
                id,
            },
        });
        return res.json(user);
    } catch(e) {
        return res.status(400).json(e);
    }
});

//ユーザの個別情報の取得
app.get('/users/:id', async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return res.json(user);
    } catch(e) {
        return res.status(400).json(e);
    }
});

//Postデータの作成
app.post('/posts', async(req: Request, res: Response) => {
    const { title, content, authorId } = req.body;
    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
        return res.json(post);
    } catch(e) {
        return res.status(400).json(e);
    }
});

//起動
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
