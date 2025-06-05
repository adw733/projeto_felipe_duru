import { Injectable } from '@nestjs/common';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';
import { S3Client, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Anexo } from './entities/anexo.entity';
import { Repository } from 'typeorm';
import { CommonService } from '../common/common/common.service';

@Injectable()
export class AnexosService {
  constructor(
    @InjectRepository(Anexo) private anexoRepository: Repository<Anexo>,
    private readonly commonService: CommonService,
  ) {}

  // const params = {
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: `${caminho}/${hash}-${idRegistro}-${file.originalname}`,
  //   Body: file.buffer?.type == 'Buffer' ? Buffer(file.buffer.data, 'binary') : file.buffer,
  //   ContentType: file.mimetype,
  // };

  private AWS_S3_BUCKET = process.env.AWS_BUCKET_NAME;
  private s3Config = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // private s3 = new S3({
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // });

  async create(createAnexoDto: CreateAnexoDto, file: Express.Multer.File) {
    const { originalname } = file;
    const name = `${createAnexoDto.pagina}/${createAnexoDto.registroId}/${originalname}`;

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: name,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    let anexo: Anexo = {} as Anexo;

    try {
      await new Upload({
        client: this.s3Config,
        params: params,
      })
        .done()
        .then(async (arquivo: any) => {
          const newArtigo: Anexo = this.anexoRepository.create(createAnexoDto);
          newArtigo.key = name;
          newArtigo.url = arquivo.Location;

          anexo = await this.anexoRepository.save(newArtigo);
        })
        .catch((err: any) => {
          throw err;
        });
    } catch (e) {
      console.log(e);
    }

    return anexo;
  }

  async update(updateAnexoDto: UpdateAnexoDto, file: Express.Multer.File) {
    const { originalname } = file;
    const name = `${updateAnexoDto.pagina}/${updateAnexoDto.registroId}/${originalname}`;

    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: name,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const anexo = await this.findOne(
      updateAnexoDto.registroId,
      updateAnexoDto.tipoId,
    );

    await this.deleteObject(anexo.key);

    try {
      await new Upload({
        client: this.s3Config,
        params: params,
      })
        .done()
        .then(async (arquivo: any) => {

          updateAnexoDto.key = name;
          updateAnexoDto.url = arquivo.Location;
          
          await this.anexoRepository.save({ ...anexo, ...updateAnexoDto });          
        })
        .catch((err: any) => {
          throw err;
        });
    } catch (e) {
      console.log(e);
    }

    return await this.anexoRepository.findOne({
      where: {
        id: updateAnexoDto.id
      }
    })
  }

  async findOne(registroId: number, tipoId: number) {
    return await this.anexoRepository.findOne({
      where: {
        registroId,
        tipoId,
      },
    });
  }

  async remove(updateAnexoDto: UpdateAnexoDto) {
    this.deleteObject(updateAnexoDto.key)
    await this.anexoRepository.delete(updateAnexoDto);
    return null
  }

  async deleteObject(Key: string) {
    var s3 = new S3();
    var params = { Bucket: this.AWS_S3_BUCKET, Key };

    s3.deleteObject(
      params,
      (err: any, data: any) => {
        if (err) {
          console.log(err, err.stack); // error
        } else {
          console.log();
        }
      },
    );
  }
}
