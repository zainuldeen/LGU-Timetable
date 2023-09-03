import PastPaper from '~/components/pastpaper/pastpaper';

import { GetServerSidePropsContext } from 'next';
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { pastPapersCol, pastPapersInputCol } from '~/lib/firebase';
import { PastPaperDocType } from '~/types/typedef';

import { fromFirebaseTimeStamp } from '~/lib/util';
import AdminLayout from '~/components/admin/layout';

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const subjectDocRef = doc(pastPapersInputCol, 'subjects');

    const [subjectsSnapShot, pastPapersSnapShot] = await Promise.all([
        getDoc(subjectDocRef),
        getDocs(pastPapersCol)
    ]);

    const data = subjectsSnapShot.data();

    const pastPapers = pastPapersSnapShot.docs.map((data) => ({
        ...data.data(),
        uploadedAt: fromFirebaseTimeStamp(data.data().uploadedAt).toString()
    }));

    return {
        props: {
            data,
            pastPapers
        }
    };
}

interface GetStaticPropsReturnType {
    data: { data: { [department: string]: Array<string> } };
    pastPapers: Array<PastPaperDocType>;
}

export default function PastPaperPage({ data, pastPapers }: GetStaticPropsReturnType) {
    return (
        <>
            <AdminLayout>
                <PastPaper staticData={data.data} pastPapers={pastPapers} />
            </AdminLayout>
        </>
    );
}
